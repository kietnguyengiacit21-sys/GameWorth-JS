const pool = require('../config/db');

const publicUserSelect = `
  SELECT
    id,
    username,
    email,
    display_name AS displayName,
    avatar_url AS avatarUrl,
    bio,
    review_count AS reviewCount,
    wishlist_count AS wishlistCount,
    average_rating AS averageRating,
    DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s') AS createdAt,
    DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%s') AS updatedAt
  FROM users
`;

async function findPublicById(id) {
  const [rows] = await pool.query(
    `${publicUserSelect} WHERE id = ? LIMIT 1`,
    [id],
  );

  return rows[0] || null;
}

async function findAuthByIdentifier(identifier) {
  const [rows] = await pool.query(
    `
      SELECT
        id,
        username,
        email,
        password_hash AS passwordHash,
        display_name AS displayName,
        avatar_url AS avatarUrl,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s') AS createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%s') AS updatedAt
      FROM users
      WHERE email = ? OR username = ?
      LIMIT 1
    `,
    [identifier, identifier],
  );

  return rows[0] || null;
}

async function findAuthByEmail(email) {
  const [rows] = await pool.query(
    `
      SELECT
        id,
        username,
        email,
        password_hash AS passwordHash,
        display_name AS displayName,
        avatar_url AS avatarUrl,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s') AS createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%s') AS updatedAt
      FROM users
      WHERE email = ?
      LIMIT 1
    `,
    [email],
  );

  return rows[0] || null;
}

async function createPasswordResetToken(userId, tokenHash, expiresAt) {
  await pool.query(
    `
      INSERT INTO password_reset_tokens (
        user_id,
        token_hash,
        expires_at
      ) VALUES (?, ?, ?)
    `,
    [userId, tokenHash, expiresAt],
  );
}

async function findPasswordResetTokenByHash(tokenHash) {
  const [rows] = await pool.query(
    `
      SELECT
        id,
        user_id AS userId,
        token_hash AS tokenHash,
        expires_at AS expiresAt
      FROM password_reset_tokens
      WHERE token_hash = ?
      LIMIT 1
    `,
    [tokenHash],
  );

  return rows[0] || null;
}

async function deletePasswordResetTokenById(id) {
  await pool.query(
    `DELETE FROM password_reset_tokens WHERE id = ?`,
    [id],
  );
}

async function deletePasswordResetTokensByUserId(userId) {
  await pool.query(
    `DELETE FROM password_reset_tokens WHERE user_id = ?`,
    [userId],
  );
}

async function setPassword(userId, passwordHash) {
  await pool.query(
    `UPDATE users SET password_hash = ? WHERE id = ?`,
    [passwordHash, userId],
  );
}

async function emailExists(email, exceptUserId = null) {
  let sql = 'SELECT id FROM users WHERE email = ?';
  const params = [email];

  if (exceptUserId !== null) {
    sql += ' AND id <> ?';
    params.push(exceptUserId);
  }

  sql += ' LIMIT 1';

  const [rows] = await pool.query(sql, params);
  return rows.length > 0;
}

async function usernameExists(username, exceptUserId = null) {
  if (!username) {
    return false;
  }

  let sql = 'SELECT id FROM users WHERE username = ?';
  const params = [username];

  if (exceptUserId !== null) {
    sql += ' AND id <> ?';
    params.push(exceptUserId);
  }

  sql += ' LIMIT 1';

  const [rows] = await pool.query(sql, params);
  return rows.length > 0;
}

async function create({username, email, passwordHash, displayName}) {
  const [result] = await pool.query(
    `
      INSERT INTO users (
        username,
        email,
        password_hash,
        display_name
      )
      VALUES (?, ?, ?, ?)
    `,
    [username || null, email, passwordHash, displayName],
  );

  return findPublicById(result.insertId);
}

async function update(id, fields) {
  const sets = [];
  const params = [];

  if (Object.prototype.hasOwnProperty.call(fields, 'username')) {
    sets.push('username = ?');
    params.push(fields.username || null);
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'email')) {
    sets.push('email = ?');
    params.push(fields.email);
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'displayName')) {
    sets.push('display_name = ?');
    params.push(fields.displayName);
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'avatarUrl')) {
    sets.push('avatar_url = ?');
    params.push(fields.avatarUrl || null);
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'bio')) {
    sets.push('bio = ?');
    params.push(fields.bio || null);
  }

  if (sets.length === 0) {
    return findPublicById(id);
  }

  params.push(id);

  await pool.query(
    `UPDATE users SET ${sets.join(', ')} WHERE id = ?`,
    params,
  );

  return findPublicById(id);
}

module.exports = {
  findPublicById,
  findAuthByIdentifier,
  findAuthByEmail,
  createPasswordResetToken,
  findPasswordResetTokenByHash,
  deletePasswordResetTokenById,
  deletePasswordResetTokensByUserId,
  setPassword,
  emailExists,
  usernameExists,
  create,
  update,
};
