const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const reviewController = require('../controllers/reviewController');

const router = express.Router();


router.get('/mine', authMiddleware, reviewController.getMyReviews);

router.get('/:id', reviewController.getReviewById);

router.put('/:id', authMiddleware, reviewController.updateReview);

router.delete('/:id', authMiddleware, reviewController.deleteReview);


module.exports = router;