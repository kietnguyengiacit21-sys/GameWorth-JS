const pool = require('../config/db');


const reviewSelect = `
  SELECT
    r.id,
    r.user_id AS userId,
    r.game_id AS gameId,
    r.rating,
    r.verdict,
    r.comment,
    u.display_name AS userDisplayName,
    u.username AS username,
    u.avatar_url AS userAvatarUrl,
    g.title AS gameTitle,
    g.genre AS gameGenre,
    g.platform AS gamePlatform,
    g.cover_image_url AS gameCoverImageUrl,
    DATE_FORMAT(r.created_at, '%Y-%m-%dT%H:%i:%s') AS createdAt,
    DATE_FORMAT(r.updated_at, '%Y-%m-%dT%H:%i:%s') AS updatedAt
  FROM reviews r
  JOIN users u ON u.id = r.user_id
  JOIN games g ON g.id = r.game_id
`;


async function findByGameId(gameId) {
  const sql = reviewSelect + ' WHERE r.game_id = ? ORDER BY r.created_at DESC';

  const [rows] = await pool.query(sql, [gameId]);

  return rows;
}


async function findById(id) {
  const sql = reviewSelect + ' WHERE r.id = ? LIMIT 1';

  const [rows] = await pool.query(sql, [id]);

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
}


async function findByUserId(userId) {
  const sql = reviewSelect + ' WHERE r.user_id = ? ORDER BY r.updated_at DESC';

  const [rows] = await pool.query(sql, [userId]);

  return rows;
}


async function create(reviewData) {
  const userId = reviewData.userId;
  const gameId = reviewData.gameId;
  const rating = reviewData.rating;
  const verdict = reviewData.verdict;
  const comment = reviewData.comment;

  const sql = `
    INSERT INTO reviews (
      user_id,
      game_id,
      rating,
      verdict,
      comment
    )
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


async function update(id, userId, reviewData) {
  const rating = reviewData.rating;
  const verdict = reviewData.verdict;
  const comment = reviewData.comment;

  const sql = `
    UPDATE reviews
    SET
      rating = ?,
      verdict = ?,
      comment = ?
    WHERE id = ? AND user_id = ?
  `;

  const [result] = await pool.query(sql, [
    rating,
    verdict,
    comment,
    id,
    userId,
  ]);

  if (result.affectedRows === 0) {
    return null;
  }

  await updateUserReviewStats(userId);

  return findById(id);
}


async function remove(id, userId) {
  const sql = 'DELETE FROM reviews WHERE id = ? AND user_id = ?';

  const [result] = await pool.query(sql, [id, userId]);

  if (result.affectedRows > 0) {
    await updateUserReviewStats(userId);
    return true;
  }

  return false;
}


async function getGameSummary(gameId) {
  const sql = `
    SELECT
      COUNT(*) AS reviewCount,
      COALESCE(AVG(rating), 0) AS averageRating,
      SUM(CASE WHEN verdict = 'WORTH_IT' THEN 1 ELSE 0 END) AS worthItCount,
      SUM(CASE WHEN verdict = 'NOT_WORTH_IT' THEN 1 ELSE 0 END) AS notWorthItCount,
      SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) AS fiveStarCount,
      SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) AS fourStarCount,
      SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) AS threeStarCount,
      SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) AS twoStarCount,
      SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) AS oneStarCount
    FROM reviews
    WHERE game_id = ?
  `;

  const [rows] = await pool.query(sql, [gameId]);

  const row = rows[0];

  const reviewCount = Number(row.reviewCount);
  const worthItCount = Number(row.worthItCount);

  let worthItPercentage = 0;

  if (reviewCount > 0) {
    worthItPercentage = Math.round((worthItCount / reviewCount) * 100);
  }

  return {
    reviewCount: reviewCount,
    averageRating: Number(Number(row.averageRating).toFixed(1)),
    worthItCount: worthItCount,
    notWorthItCount: Number(row.notWorthItCount),
    worthItPercentage: worthItPercentage,
    fiveStarCount: Number(row.fiveStarCount),
    fourStarCount: Number(row.fourStarCount),
    threeStarCount: Number(row.threeStarCount),
    twoStarCount: Number(row.twoStarCount),
    oneStarCount: Number(row.oneStarCount),
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

  await pool.query(sql, [userId, userId, userId]);
}

module.exports = {
  findByGameId,
  findById,
  findByUserId,
  create,
  update,
  remove,
  getGameSummary,
};