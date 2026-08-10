const express = require('express');

const gameController = require('../controllers/gameController');
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', gameController.getGames);
router.get('/:gameId/reviews', reviewController.getGameReviews);
router.post(
  '/:gameId/reviews',
  authMiddleware,
  reviewController.createReview,
);
router.get('/:id', gameController.getGameById);

module.exports = router;
