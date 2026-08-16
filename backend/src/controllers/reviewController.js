const reviewRepository = require('../repositories/reviewRepository');


async function getReviewsByGame(request, response, next) {
  try {
    const gameId = Number(request.params.gameId);

    const reviews = await reviewRepository.findByGameId(gameId);

    response.json(reviews);
  } catch (error) {
    next(error);
  }
}


async function getReviewsByUser(request, response, next) {
  try {
    const userId = Number(request.params.userId);

    const reviews = await reviewRepository.findByUserId(userId);

    response.json(reviews);
  } catch (error) {
    next(error);
  }
}


async function getReviewDetail(request, response, next) {
  try {
    const reviewId = Number(request.params.id);

    const review = await reviewRepository.findById(reviewId);

    if (review == null) {
      response.status(404).json({
        message: 'Review not found',
      });

      return;
    }

    response.json(review);
  } catch (error) {
    next(error);
  }
}


async function createReview(request, response, next) {
  try {
    const userId = Number(request.body.userId);
    const gameId = Number(request.body.gameId);
    const rating = Number(request.body.rating);
    const verdict = request.body.verdict;

    let comment = '';

    if (request.body.comment != null) {
      comment = request.body.comment.trim();
    }


    if (userId <= 0 || gameId <= 0) {
      response.status(400).json({
        message: 'User and game are required',
      });

      return;
    }


    if (rating < 1 || rating > 5) {
      response.status(400).json({
        message: 'Rating must be between 1 and 5',
      });

      return;
    }


    if (verdict !== 'WORTH_IT' && verdict !== 'NOT_WORTH_IT') {
      response.status(400).json({
        message: 'Invalid verdict',
      });

      return;
    }


    const review = await reviewRepository.createReview(
      userId,
      gameId,
      rating,
      verdict,
      comment
    );

    response.status(201).json(review);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      response.status(409).json({
        message: 'You already reviewed this game',
      });

      return;
    }

    next(error);
  }
}


async function updateReview(request, response, next) {
  try {
    const reviewId = Number(request.params.id);
    const rating = Number(request.body.rating);
    const verdict = request.body.verdict;

    let comment = '';

    if (request.body.comment != null) {
      comment = request.body.comment.trim();
    }


    if (rating < 1 || rating > 5) {
      response.status(400).json({
        message: 'Rating must be between 1 and 5',
      });

      return;
    }


    if (verdict !== 'WORTH_IT' && verdict !== 'NOT_WORTH_IT') {
      response.status(400).json({
        message: 'Invalid verdict',
      });

      return;
    }


    const review = await reviewRepository.updateReview(
      reviewId,
      rating,
      verdict,
      comment
    );


    if (review == null) {
      response.status(404).json({
        message: 'Review not found',
      });

      return;
    }


    response.json(review);
  } catch (error) {
    next(error);
  }
}


async function deleteReview(request, response, next) {
  try {
    const reviewId = Number(request.params.id);

    const deleted = await reviewRepository.deleteReview(reviewId);


    if (!deleted) {
      response.status(404).json({
        message: 'Review not found',
      });

      return;
    }


    response.json({
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}


async function getCommunityRating(request, response, next) {
  try {
    const gameId = Number(request.params.gameId);

    const summary = await reviewRepository.getGameSummary(gameId);

    response.json(summary);
  } catch (error) {
    next(error);
  }
}


module.exports = {
  getReviewsByGame,
  getReviewsByUser,
  getReviewDetail,
  createReview,
  updateReview,
  deleteReview,
  getCommunityRating,
};