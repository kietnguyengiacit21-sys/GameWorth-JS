const pool = require('../config/db');

const gameSelect = `
  SELECT
    id,
    title,
    description,
    developer,
    publisher,
    genre,
    platform,
    DATE_FORMAT(release_date, '%Y-%m-%d') AS releaseDate,
    price,
    cover_image_url AS coverImageUrl,
    trailer_url AS trailerUrl,
    minimum_requirements AS minimumRequirements,
    recommended_requirements AS recommendedRequirements,
    DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s') AS createdAt,
    DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%s') AS updatedAt
  FROM games
`;

async function findAll() {
  const [rows] = await pool.query(`${gameSelect} ORDER BY id ASC`);
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query(
    `${gameSelect} WHERE id = ? LIMIT 1`,
    [id],
  );

  return rows[0] || null;
}

module.exports = {
  findAll,
  findById,
};
