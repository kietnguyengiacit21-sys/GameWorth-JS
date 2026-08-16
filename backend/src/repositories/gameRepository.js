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
async function findMediaByGameId(gameId) {
  const sql = `
    SELECT
      id,
      game_id,
      image_url,
      sort_order
    FROM game_media
    WHERE game_id = ?
    ORDER BY sort_order ASC
  `;
  const result =
    await pool.query(
      sql,
      [gameId]
    );
  const rows =
    result[0];
  const mediaList = [];
  for (
    let i = 0;
    i < rows.length;
    i++
  ) {
    const row =
      rows[i];
    const media = {
      id: row.id,
      gameId: row.game_id,
      imageUrl: row.image_url,
      sortOrder: row.sort_order
    };
    mediaList.push(
      media
    );
  }
  return mediaList;
}
module.exports = {
  findAll,
  findById,
  findMediaByGameId,
};
