const express = require('express');

const gameController = require('../controllers/gameController');
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
console.log('getGames =', typeof gameController.getGames);
console.log('getGameById =', typeof gameController.getGameById);
console.log('getGameMedia =', typeof gameController.getGameMedia);
console.log('getGameReviews =', typeof reviewController.getGameReviews);
console.log('getGameReviewSummary =', typeof reviewController.getGameReviewSummary);
console.log('createReview =', typeof reviewController.createReview);

router.get('/', gameController.getGames);

router.get('/:gameId/media', gameController.getGameMedia);

router.get('/:gameId/reviews/summary', reviewController.getGameReviewSummary);

router.get('/:gameId/reviews', reviewController.getGameReviews);

router.post('/:gameId/reviews', authMiddleware, reviewController.createReview);

router.get('/:id', gameController.getGameById);


module.exports = router;