const gameRepository = require('../repositories/gameRepository');
const reviewRepository = require('../repositories/reviewRepository');

function validateReview(body) {
  const rating = Number(body.rating);
  const verdict = body.verdict;
  const comment = body.comment?.trim() || null;

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return {
      error: 'Rating must be an integer from 1 to 5',
    };
  }

  if (!['WORTH_IT', 'NOT_WORTH_IT'].includes(verdict)) {
    return {
      error: 'Verdict must be WORTH_IT or NOT_WORTH_IT',
    };
  }

  return {
    rating,
    verdict,
    comment,
  };
}

async function getGameReviews(req, res, next) {
  try {
    const game = await gameRepository.findById(req.params.gameId);

    if (!game) {
      return res.status(404).json({
        message: 'Game not found',
      });
    }

    const reviews = await reviewRepository.findByGameId(
      req.params.gameId,
    );

    res.json(reviews);
  } catch (error) {
    next(error);
  }
}

async function getReviewById(req, res, next) {
  try {
    const review = await reviewRepository.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: 'Review not found',
      });
    }

    res.json(review);
  } catch (error) {
    next(error);
  }
}

async function createReview(req, res, next) {
  try {
    const game = await gameRepository.findById(req.params.gameId);

    if (!game) {
      return res.status(404).json({
        message: 'Game not found',
      });
    }

    const validated = validateReview(req.body);

    if (validated.error) {
      return res.status(400).json({
        message: validated.error,
      });
    }

    try {
      const review = await reviewRepository.create({
        userId: req.userId,
        gameId: req.params.gameId,
        ...validated,
      });

      res.status(201).json(review);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          message: 'You already reviewed this game',
        });
      }

      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function updateReview(req, res, next) {
  try {
    const existing = await reviewRepository.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        message: 'Review not found',
      });
    }

    if (Number(existing.userId) !== Number(req.userId)) {
      return res.status(403).json({
        message: 'You can only edit your own review',
      });
    }

    const validated = validateReview(req.body);

    if (validated.error) {
      return res.status(400).json({
        message: validated.error,
      });
    }

    const review = await reviewRepository.update(
      req.params.id,
      req.userId,
      validated,
    );

    res.json(review);
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    const existing = await reviewRepository.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        message: 'Review not found',
      });
    }

    if (Number(existing.userId) !== Number(req.userId)) {
      return res.status(403).json({
        message: 'You can only delete your own review',
      });
    }

    await reviewRepository.remove(req.params.id, req.userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGameReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
