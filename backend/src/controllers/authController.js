const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userRepository = require('../repositories/userRepository');
const {createToken} = require('../utils/jwt');

async function register(req, res, next) {
  try {
    const username = req.body.username?.trim() || null;
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    const displayName = req.body.displayName?.trim();

    if (!email || !password || !displayName) {
      return res.status(400).json({
        message: 'email, password and displayName are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must contain at least 6 characters',
      });
    }

    if (await userRepository.emailExists(email)) {
      return res.status(409).json({
        message: 'Email already exists',
      });
    }

    if (username && await userRepository.usernameExists(username)) {
      return res.status(409).json({
        message: 'Username already exists',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
      username,
      email,
      passwordHash,
      displayName,
    });

    const token = createToken(user.id);

    res.status(201).json({
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const identifier = (
      req.body.email ||
      req.body.username ||
      req.body.identifier ||
      ''
    ).trim().toLowerCase();

    const password = req.body.password;

    if (!identifier || !password) {
      return res.status(400).json({
        message: 'Email/username and password are required',
      });
    }

    const user = await userRepository.findAuthByIdentifier(identifier);

    if (!user) {
      return res.status(401).json({
        message: 'Invalid login information',
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: 'Invalid login information',
      });
    }

    const token = createToken(user.id);

    delete user.passwordHash;

    res.json({
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
}

async function forgotPassword(req, res, next) {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        message: 'Email is required',
      });
    }

    const user = await userRepository.findAuthByEmail(email);
    const response = {
      message: 'If an account exists, password reset instructions have been sent.',
    };

    if (!user) {
      return res.json(response);
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await userRepository.deletePasswordResetTokensByUserId(user.id);
    await userRepository.createPasswordResetToken(user.id, tokenHash, expiresAt);

    console.log(`Password reset token for ${email}: ${resetToken}`);

    if (process.env.NODE_ENV !== 'production') {
      response.resetToken = resetToken;
    }

    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function resetPassword(req, res, next) {
  try {
    const token = req.body.token?.trim();
    const password = req.body.password;

    if (!token || !password) {
      return res.status(400).json({
        message: 'Token and password are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must contain at least 6 characters',
      });
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const resetRecord = await userRepository.findPasswordResetTokenByHash(tokenHash);

    if (!resetRecord || new Date(resetRecord.expiresAt) < new Date()) {
      return res.status(400).json({
        message: 'Invalid or expired reset token',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await userRepository.setPassword(resetRecord.userId, passwordHash);
    await userRepository.deletePasswordResetTokenById(resetRecord.id);

    res.json({
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
