const express = require('express');

const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.get('/game/:gameId/summary', reviewController.getCommunityRating);

router.get('/game/:gameId', reviewController.getReviewsByGame);

router.get('/user/:userId', reviewController.getReviewsByUser);

router.get('/:id', reviewController.getReviewDetail);

router.post('/', reviewController.createReview);

router.put('/:id', reviewController.updateReview);

router.delete('/:id', reviewController.deleteReview);


module.exports = router;