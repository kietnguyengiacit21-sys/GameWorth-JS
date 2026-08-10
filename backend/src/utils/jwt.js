const jwt = require('jsonwebtoken');

function createToken(userId) {
  return jwt.sign(
    {userId},
    process.env.JWT_SECRET || 'development-secret-change-me',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
  );
}

module.exports = {
  createToken,
};
