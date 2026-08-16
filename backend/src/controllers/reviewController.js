const gameRepository = require('../repositories/gameRepository');
const reviewRepository = require('../repositories/reviewRepository');


function validateReview(body) {
  const rating = Number(body.rating);
  const verdict = body.verdict;

  let comment = null;

  if (body.comment != null) {
    comment = body.comment.trim();

    if (comment === '') {
      comment = null;
    }
  }


  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return {
      error: 'Rating must be an integer from 1 to 5',
    };
  }


  if (verdict !== 'WORTH_IT' && verdict !== 'NOT_WORTH_IT') {
    return {
      error: 'Verdict must be WORTH_IT or NOT_WORTH_IT',
    };
  }


  return {
    rating: rating,
    verdict: verdict,
    comment: comment,
  };
}


async function getGameReviews(req, res, next) {
  try {
    const gameId = Number(req.params.gameId);

    const game = await gameRepository.findById(gameId);

    if (game == null) {
      res.status(404).json({
        message: 'Game not found',
      });

      return;
    }

    const reviews = await reviewRepository.findByGameId(gameId);

    res.json(reviews);
  } catch (error) {
    next(error);
  }
}


async function getGameReviewSummary(req, res, next) {
  try {
    const gameId = Number(req.params.gameId);

    const game = await gameRepository.findById(gameId);

    if (game == null) {
      res.status(404).json({
        message: 'Game not found',
      });

      return;
    }

    const summary = await reviewRepository.getGameSummary(gameId);

    res.json(summary);
  } catch (error) {
    next(error);
  }
}


async function getMyReviews(req, res, next) {
  try {
    const userId = Number(req.userId);

    const reviews = await reviewRepository.findByUserId(userId);

    res.json(reviews);
  } catch (error) {
    next(error);
  }
}


async function getReviewById(req, res, next) {
  try {
    const reviewId = Number(req.params.id);

    const review = await reviewRepository.findById(reviewId);

    if (review == null) {
      res.status(404).json({
        message: 'Review not found',
      });

      return;
    }

    res.json(review);
  } catch (error) {
    next(error);
  }
}


async function createReview(req, res, next) {
  try {
    const gameId = Number(req.params.gameId);

    const game = await gameRepository.findById(gameId);

    if (game == null) {
      res.status(404).json({
        message: 'Game not found',
      });

      return;
    }


    const validated = validateReview(req.body);

    if (validated.error != null) {
      res.status(400).json({
        message: validated.error,
      });

      return;
    }


    try {
      const reviewData = {
        userId: req.userId,
        gameId: gameId,
        rating: validated.rating,
        verdict: validated.verdict,
        comment: validated.comment,
      };

      const review = await reviewRepository.create(reviewData);

      res.status(201).json(review);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(409).json({
          message: 'You already reviewed this game',
        });

        return;
      }

      throw error;
    }
  } catch (error) {
    next(error);
  }
}


async function updateReview(req, res, next) {
  try {
    const reviewId = Number(req.params.id);
    const existing = await reviewRepository.findById(reviewId);
    if (existing == null) {
      res.status(404).json({
        message: 'Review not found',
      });

      return;
    }

    if (Number(existing.userId) !== Number(req.userId)) {
      res.status(403).json({
        message: 'You can only edit your own review',
      });

      return;
    }

    const validated = validateReview(req.body);

    if (validated.error != null) {
      res.status(400).json({
        message: validated.error,
      });

      return;
    }

    const reviewData = {
      rating: validated.rating,
      verdict: validated.verdict,
      comment: validated.comment,
    };

    const review = await reviewRepository.update(
      reviewId,
      req.userId,
      reviewData
    );


    res.json(review);
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    const reviewId = Number(req.params.id);

    const existing = await reviewRepository.findById(reviewId);


    if (existing == null) {
      res.status(404).json({
        message: 'Review not found',
      });

      return;
    }


    if (Number(existing.userId) !== Number(req.userId)) {
      res.status(403).json({
        message: 'You can only delete your own review',
      });

      return;
    }

    await reviewRepository.remove(reviewId, req.userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGameReviews,
  getGameReviewSummary,
  getMyReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};