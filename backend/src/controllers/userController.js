const userRepository = require('../repositories/userRepository');
const reviewRepository = require('../repositories/reviewRepository');

async function getMe(req, res, next) {
  try {
    const user = await userRepository.findPublicById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function updateMe(req, res, next) {
  try {
    const fields = {};

    if (req.body.username !== undefined) {
      fields.username = req.body.username?.trim() || null;
    }

    if (req.body.email !== undefined) {
      fields.email = req.body.email?.trim().toLowerCase();
    }

    if (req.body.displayName !== undefined) {
      fields.displayName = req.body.displayName?.trim();
    }

    if (req.body.avatarUrl !== undefined) {
      fields.avatarUrl = req.body.avatarUrl?.trim() || null;
    }

    if (fields.email === '') {
      return res.status(400).json({
        message: 'Email cannot be empty',
      });
    }

    if (fields.displayName === '') {
      return res.status(400).json({
        message: 'Display name cannot be empty',
      });
    }

    if (
      fields.email &&
      await userRepository.emailExists(fields.email, req.userId)
    ) {
      return res.status(409).json({
        message: 'Email already exists',
      });
    }

    if (
      fields.username &&
      await userRepository.usernameExists(fields.username, req.userId)
    ) {
      return res.status(409).json({
        message: 'Username already exists',
      });
    }

    const user = await userRepository.update(req.userId, fields);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function getMyReviews(req, res, next) {
  try {
    const reviews = await reviewRepository.findByUserId(req.userId);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMe,
  updateMe,
  getMyReviews,
};
