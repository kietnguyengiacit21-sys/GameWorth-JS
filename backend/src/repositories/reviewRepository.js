const pool = require('../config/db');


async function findByGameId(gameId) {
  const sql = `
    SELECT
      r.id,
      r.user_id,
      r.game_id,
      r.rating,
      r.verdict,
      r.comment,
      r.created_at,
      r.updated_at,
      u.display_name,
      u.username,
      u.avatar_url
    FROM reviews r
    JOIN users u ON u.id = r.user_id
    WHERE r.game_id = ?
    ORDER BY r.updated_at DESC
  `;

  const [rows] = await pool.query(sql, [gameId]);

  return rows.map(mapReview);
}


async function findByUserId(userId) {
  const sql = `
    SELECT
      r.id,
      r.user_id,
      r.game_id,
      r.rating,
      r.verdict,
      r.comment,
      r.created_at,
      r.updated_at,
      g.title,
      g.genre,
      g.platform,
      g.cover_image_url
    FROM reviews r
    JOIN games g ON g.id = r.game_id
    WHERE r.user_id = ?
    ORDER BY r.updated_at DESC
  `;

  const [rows] = await pool.query(sql, [userId]);

  return rows.map(mapUserReview);
}


async function findById(reviewId) {
  const sql = `
    SELECT
      r.id,
      r.user_id,
      r.game_id,
      r.rating,
      r.verdict,
      r.comment,
      r.created_at,
      r.updated_at,

      u.display_name,
      u.username,
      u.avatar_url,

      g.title,
      g.genre,
      g.platform,
      g.cover_image_url

    FROM reviews r
    JOIN users u ON u.id = r.user_id
    JOIN games g ON g.id = r.game_id

    WHERE r.id = ?
  `;

  const [rows] = await pool.query(sql, [reviewId]);

  if (rows.length === 0) {
    return null;
  }

  return mapReviewDetail(rows[0]);
}


async function createReview(userId, gameId, rating, verdict, comment) {
  const sql = `
    INSERT INTO reviews
    (user_id, game_id, rating, verdict, comment)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await pool.query(sql, [
    userId,
    gameId,
    rating,
    verdict,
    comment,
  ]);

  await updateUserReviewStats(userId);

  return findById(result.insertId);
}


async function updateReview(reviewId, rating, verdict, comment) {
  const review = await findById(reviewId);

  if (review == null) {
    return null;
  }

  const sql = `
    UPDATE reviews
    SET
      rating = ?,
      verdict = ?,
      comment = ?
    WHERE id = ?
  `;

  await pool.query(sql, [
    rating,
    verdict,
    comment,
    reviewId,
  ]);

  await updateUserReviewStats(review.userId);

  return findById(reviewId);
}


async function deleteReview(reviewId) {
  const review = await findById(reviewId);

  if (review == null) {
    return false;
  }

  const sql = `
    DELETE FROM reviews
    WHERE id = ?
  `;

  await pool.query(sql, [reviewId]);

  await updateUserReviewStats(review.userId);

  return true;
}


async function getGameSummary(gameId) {
  const sql = `
    SELECT
      COUNT(*) AS review_count,
      COALESCE(AVG(rating), 0) AS average_rating,
      SUM(CASE WHEN verdict = 'WORTH_IT' THEN 1 ELSE 0 END) AS worth_it_count,
      SUM(CASE WHEN verdict = 'NOT_WORTH_IT' THEN 1 ELSE 0 END) AS not_worth_it_count,

      SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) AS five_star_count,
      SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) AS four_star_count,
      SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) AS three_star_count,
      SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) AS two_star_count,
      SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) AS one_star_count

    FROM reviews
    WHERE game_id = ?
  `;

  const [rows] = await pool.query(sql, [gameId]);

  const row = rows[0];

  const reviewCount = Number(row.review_count);
  const worthItCount = Number(row.worth_it_count);

  let worthItPercentage = 0;

  if (reviewCount > 0) {
    worthItPercentage = Math.round((worthItCount / reviewCount) * 100);
  }

  return {
    reviewCount: reviewCount,
    averageRating: Number(Number(row.average_rating).toFixed(1)),
    worthItCount: worthItCount,
    notWorthItCount: Number(row.not_worth_it_count),
    worthItPercentage: worthItPercentage,
    fiveStarCount: Number(row.five_star_count),
    fourStarCount: Number(row.four_star_count),
    threeStarCount: Number(row.three_star_count),
    twoStarCount: Number(row.two_star_count),
    oneStarCount: Number(row.one_star_count),
  };
}


async function updateUserReviewStats(userId) {
  const sql = `
    UPDATE users
    SET
      review_count = (
        SELECT COUNT(*)
        FROM reviews
        WHERE user_id = ?
      ),
      average_rating = (
        SELECT COALESCE(AVG(rating), 0)
        FROM reviews
        WHERE user_id = ?
      )
    WHERE id = ?
  `;

  await pool.query(sql, [
    userId,
    userId,
    userId,
  ]);
}


function mapReview(row) {
  return {
    id: row.id,
    userId: row.user_id,
    gameId: row.game_id,
    rating: row.rating,
    verdict: row.verdict,
    comment: row.comment,
    createdAt: row.created_at,
    updatedAt: row.updated_at,

    user: {
      displayName: row.display_name,
      username: row.username,
      avatarUrl: row.avatar_url,
    },
  };
}


function mapUserReview(row) {
  return {
    id: row.id,
    userId: row.user_id,
    gameId: row.game_id,
    rating: row.rating,
    verdict: row.verdict,
    comment: row.comment,
    createdAt: row.created_at,
    updatedAt: row.updated_at,

    game: {
      id: row.game_id,
      title: row.title,
      genre: row.genre,
      platform: row.platform,
      coverImageUrl: row.cover_image_url,
    },
  };
}


function mapReviewDetail(row) {
  return {
    id: row.id,
    userId: row.user_id,
    gameId: row.game_id,
    rating: row.rating,
    verdict: row.verdict,
    comment: row.comment,
    createdAt: row.created_at,
    updatedAt: row.updated_at,

    user: {
      displayName: row.display_name,
      username: row.username,
      avatarUrl: row.avatar_url,
    },

    game: {
      id: row.game_id,
      title: row.title,
      genre: row.genre,
      platform: row.platform,
      coverImageUrl: row.cover_image_url,
    },
  };
}


module.exports = {
  findByGameId,
  findByUserId,
  findById,
  createReview,
  updateReview,
  deleteReview,
  getGameSummary,
};