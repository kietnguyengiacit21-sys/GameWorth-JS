CREATE DATABASE IF NOT EXISTS gameworth
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE gameworth;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    token_hash VARCHAR(128) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_password_reset_tokens_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    UNIQUE KEY uq_password_reset_tokens_token_hash (token_hash)
);

CREATE TABLE IF NOT EXISTS games (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    developer VARCHAR(150),
    publisher VARCHAR(150),
    genre VARCHAR(100),
    platform VARCHAR(100),
    release_date DATE,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    cover_image_url VARCHAR(500),
    trailer_url VARCHAR(500),
    minimum_requirements TEXT,
    recommended_requirements TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    game_id BIGINT NOT NULL,
    rating TINYINT NOT NULL,
    verdict ENUM('WORTH_IT', 'NOT_WORTH_IT') NOT NULL,
    comment TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_reviews_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_reviews_game
        FOREIGN KEY (game_id)
        REFERENCES games(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_reviews_user_game
        UNIQUE (user_id, game_id),

    CONSTRAINT chk_reviews_rating
        CHECK (rating BETWEEN 1 AND 5)
);

INSERT INTO games
(title, description, developer, publisher, genre, platform, release_date, price,
 minimum_requirements, recommended_requirements)
SELECT
    'Persona 5 Royal',
    'A story-driven role-playing game about students living a double life as Phantom Thieves.',
    'Atlus',
    'SEGA',
    'RPG',
    'PC, PlayStation, Xbox, Switch',
    '2022-10-21',
    59.99,
    'Windows 10, Intel Core i7-4790, 8 GB RAM, GTX 650 Ti',
    'Windows 10, Intel Core i7-4790, 8 GB RAM, GTX 760'
WHERE NOT EXISTS (
    SELECT 1 FROM games WHERE title = 'Persona 5 Royal'
);

INSERT INTO games
(title, description, developer, publisher, genre, platform, release_date, price,
 minimum_requirements, recommended_requirements)
SELECT
    'Wuthering Waves',
    'An open-world action RPG featuring fast combat and character collection.',
    'Kuro Games',
    'Kuro Games',
    'Action RPG',
    'PC, Mobile',
    '2024-05-22',
    0.00,
    'Windows 10, Intel Core i5, 16 GB RAM',
    'Windows 10, Intel Core i7, 16 GB RAM, RTX-class GPU'
WHERE NOT EXISTS (
    SELECT 1 FROM games WHERE title = 'Wuthering Waves'
);

INSERT INTO games
(title, description, developer, publisher, genre, platform, release_date, price,
 minimum_requirements, recommended_requirements)
SELECT
    'DOOM Eternal',
    'A fast-paced first-person shooter focused on aggressive combat.',
    'id Software',
    'Bethesda Softworks',
    'FPS',
    'PC, PlayStation, Xbox, Switch',
    '2020-03-20',
    39.99,
    'Windows 7 64-bit, Intel Core i5, 8 GB RAM, GTX 1050 Ti',
    'Windows 10 64-bit, Intel Core i7, 8 GB RAM, GTX 1060'
WHERE NOT EXISTS (
    SELECT 1 FROM games WHERE title = 'DOOM Eternal'
);
