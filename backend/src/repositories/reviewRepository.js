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
    g.title AS gameTitle,
    DATE_FORMAT(r.created_at, '%Y-%m-%dT%H:%i:%s') AS createdAt,
    DATE_FORMAT(r.updated_at, '%Y-%m-%dT%H:%i:%s') AS updatedAt
  FROM reviews r
  JOIN users u ON u.id = r.user_id
  JOIN games g ON g.id = r.game_id
`;

async function findByGameId(gameId) {
  const [rows] = await pool.query(
    `${reviewSelect} WHERE r.game_id = ? ORDER BY r.created_at DESC`,
    [gameId],
  );

  return rows;
}

async function findById(id) {
  const [rows] = await pool.query(
    `${reviewSelect} WHERE r.id = ? LIMIT 1`,
    [id],
  );

  return rows[0] || null;
}

async function findByUserId(userId) {
  const [rows] = await pool.query(
    `${reviewSelect} WHERE r.user_id = ? ORDER BY r.updated_at DESC`,
    [userId],
  );

  return rows;
}

async function create({userId, gameId, rating, verdict, comment}) {
  const [result] = await pool.query(
    `
      INSERT INTO reviews (
        user_id,
        game_id,
        rating,
        verdict,
        comment
      )
      VALUES (?, ?, ?, ?, ?)
    `,
    [userId, gameId, rating, verdict, comment || null],
  );

  return findById(result.insertId);
}

async function update(id, userId, {rating, verdict, comment}) {
  const [result] = await pool.query(
    `
      UPDATE reviews
      SET
        rating = ?,
        verdict = ?,
        comment = ?
      WHERE id = ? AND user_id = ?
    `,
    [rating, verdict, comment || null, id, userId],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return findById(id);
}

async function remove(id, userId) {
  const [result] = await pool.query(
    'DELETE FROM reviews WHERE id = ? AND user_id = ?',
    [id, userId],
  );

  return result.affectedRows > 0;
}

module.exports = {
  findByGameId,
  findById,
  findByUserId,
  create,
  update,
  remove,
};
