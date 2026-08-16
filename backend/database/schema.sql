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
USE gameworth;

INSERT INTO games
(
    title,
    description,
    developer,
    publisher,
    genre,
    platform,
    release_date,
    price,
    cover_image_url,
    trailer_url,
    minimum_requirements,
    recommended_requirements
)
VALUES

(
    'Grand Theft Auto V',
    'An open-world action game set in Los Santos, featuring a large story campaign, vehicles, missions and exploration.',
    'Rockstar Games',
    'Rockstar Games',
    'Action, Open World',
    'PC, PlayStation, Xbox',
    '2015-04-14',
    29.99,
    NULL,
    NULL,
    NULL,
    NULL
),

(
    'Forza Horizon 6',
    'An open-world racing game set in Japan with hundreds of cars, racing events and free-roam exploration.',
    'Playground Games',
    'Xbox Game Studios',
    'Racing, Open World',
    'PC, Xbox Series X|S',
    '2026-05-19',
    69.99,
    NULL,
    NULL,
    NULL,
    NULL
),

(
    'Ghost of Tsushima Director''s Cut',
    'An open-world action adventure following samurai Jin Sakai as he fights to defend Tsushima.',
    'Sucker Punch Productions',
    'PlayStation Publishing LLC',
    'Action Adventure',
    'PC, PlayStation',
    '2024-05-16',
    59.99,
    NULL,
    NULL,
    NULL,
    NULL
),

(
    'Palworld',
    'An open-world survival and crafting game where players explore, build bases and collect creatures known as Pals.',
    'Pocketpair',
    'Pocketpair',
    'Survival, Open World',
    'PC, Xbox, PlayStation',
    '2026-07-09',
    29.99,
    NULL,
    NULL,
    NULL,
    NULL
),

(
    'Baldur''s Gate 3',
    'A story-driven role-playing game based on Dungeons and Dragons with tactical combat, exploration and player choices.',
    'Larian Studios',
    'Larian Studios',
    'RPG',
    'PC, PlayStation, Xbox',
    '2023-08-03',
    59.99,
    NULL,
    NULL,
    NULL,
    NULL
),

(
    'Sea of Thieves',
    'A multiplayer pirate adventure focused on sailing, treasure hunting, exploration and battles at sea.',
    'Rare Ltd',
    'Xbox Game Studios',
    'Adventure, Multiplayer',
    'PC, Xbox, PlayStation',
    '2020-06-03',
    39.99,
    NULL,
    NULL,
    NULL,
    NULL
),

(
    'God of War',
    'An action adventure following Kratos and his son Atreus on a journey through the world of Norse mythology.',
    'Santa Monica Studio',
    'PlayStation Publishing LLC',
    'Action Adventure',
    'PC, PlayStation',
    '2022-01-14',
    49.99,
    NULL,
    NULL,
    NULL,
    NULL
);
SELECT
    id,
    title,
    genre,
    platform,
    price,
    cover_image_url
FROM games;
USE gameworth;

UPDATE games
SET cover_image_url = 'http://10.0.2.2:8080/images/persona5.jpg'
WHERE title = 'Persona 5 Royal';

UPDATE games
SET cover_image_url = 'http://10.0.2.2:8080/images/wuthering-waves.jpg'
WHERE title = 'Wuthering Waves';

UPDATE games
SET cover_image_url = 'http://10.0.2.2:8080/images/doom-eternal.jpg'
WHERE title = 'DOOM Eternal';

UPDATE games
SET cover_image_url = 'http://10.0.2.2:8080/images/gta5.jpg'
WHERE title = 'Grand Theft Auto V';

UPDATE games
SET cover_image_url = 'http://10.0.2.2:8080/images/forza-horizon-6.jpg'
WHERE title = 'Forza Horizon 6';

UPDATE games
SET cover_image_url = 'http://10.0.2.2:8080/images/ghost-of-tsushima.jpg'
WHERE title = 'Ghost of Tsushima Director''s Cut';

UPDATE games
SET cover_image_url = 'http://10.0.2.2:8080/images/palworld.jpg'
WHERE title = 'Palworld';

UPDATE games
SET cover_image_url = 'http://10.0.2.2:8080/images/baldurs-gate-3.jpg'
WHERE title = 'Baldur''s Gate 3';

UPDATE games
SET cover_image_url = 'http://10.0.2.2:8080/images/sea-of-thieves.jpg'
WHERE title = 'Sea of Thieves';

UPDATE games
SET cover_image_url = 'http://10.0.2.2:8080/images/god-of-war.jpg'
WHERE title = 'God of War';
SELECT
    id,
    title,
    cover_image_url
FROM games;
USE gameworth;

DELETE FROM games
WHERE id >= 11 AND id <= 17;
SELECT id, title, cover_image_url
FROM games;
USE gameworth;

UPDATE games
SET cover_image_url =
'http://10.0.2.2:8080/images/persona5-v2.png'
WHERE id = 1;

UPDATE games
SET cover_image_url =
'http://10.0.2.2:8080/images/baldurs-gate-3-v2.png'
WHERE id = 8;
USE gameworth;

UPDATE games
SET cover_image_url =
'http://10.0.2.2:8080/images/persona5-v2.png'
WHERE id = 1;

UPDATE games
SET cover_image_url =
'http://10.0.2.2:8080/images/baldurs-gate-3-v2.png'
WHERE id = 8;
SELECT id, title, cover_image_url
FROM games
WHERE id = 1 OR id = 8;
USE gameworth;

UPDATE games
SET
minimum_requirements =
'Windows 10, Intel Core i5-3470, 8 GB RAM, NVIDIA GTX 660 2 GB, 120 GB storage',
recommended_requirements =
'Windows 10, Intel Core i5-4460, 16 GB RAM, NVIDIA GTX 1060 6 GB, 120 GB storage'
WHERE id = 4;


UPDATE games
SET
minimum_requirements =
'Windows 10, Intel Core i5-8400, 16 GB RAM, NVIDIA GTX 1060 6 GB, 110 GB storage',
recommended_requirements =
'Windows 11, Intel Core i7-10700K, 16 GB RAM, NVIDIA RTX 3070, 110 GB storage'
WHERE id = 5;


UPDATE games
SET
minimum_requirements =
'Windows 10, Intel Core i3-7100, 8 GB RAM, NVIDIA GTX 960 4 GB, 75 GB storage',
recommended_requirements =
'Windows 10, Intel Core i5-8600, 16 GB RAM, NVIDIA RTX 2060, 75 GB storage'
WHERE id = 6;


UPDATE games
SET
minimum_requirements =
'Windows 10, Intel Core i5-3570K, 16 GB RAM, NVIDIA GTX 1050, 40 GB storage',
recommended_requirements =
'Windows 10, Intel Core i9-9900K, 32 GB RAM, NVIDIA RTX 2070, 40 GB storage'
WHERE id = 7;


UPDATE games
SET
minimum_requirements =
'Windows 10, Intel Core i5-4690, 8 GB RAM, NVIDIA GTX 970, 150 GB storage',
recommended_requirements =
'Windows 10, Intel Core i7-8700K, 16 GB RAM, NVIDIA RTX 2060 SUPER, 150 GB storage'
WHERE id = 8;


UPDATE games
SET
minimum_requirements =
'Windows 10, Intel Core i5-4690, 8 GB RAM, NVIDIA GTX 650, 100 GB storage',
recommended_requirements =
'Windows 10, Intel Core i7-4790, 16 GB RAM, NVIDIA GTX 1060, 100 GB storage'
WHERE id = 9;


UPDATE games
SET
minimum_requirements =
'Windows 10, Intel Core i5-2500K, 8 GB RAM, NVIDIA GTX 960, 70 GB storage',
recommended_requirements =
'Windows 10, Intel Core i5-6600K, 8 GB RAM, NVIDIA GTX 1060, 70 GB storage'
WHERE id = 10;
USE gameworth;

CREATE TABLE game_media (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    game_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    sort_order INT DEFAULT 0,

    FOREIGN KEY (game_id)
        REFERENCES games(id)
        ON DELETE CASCADE
);
SHOW TABLES;
INSERT INTO game_media
(game_id, image_url, sort_order)
VALUES
(
    1,
    'http://10.0.2.2:8080/images/media/persona5/1.jpg',
    1
),
(
    1,
    'http://10.0.2.2:8080/images/media/persona5/2.jpg',
    2
),
(
    1,
    'http://10.0.2.2:8080/images/media/persona5/3.jpg',
    3
),
(
    1,
    'http://10.0.2.2:8080/images/media/persona5/4.jpg',
    4
),
(
    1,
    'http://10.0.2.2:8080/images/media/persona5/5.jpg',
    5
);
SELECT *
FROM game_media
WHERE game_id = 1
ORDER BY sort_order;
USE gameworth;

DELETE FROM game_media
WHERE id > 0;

ALTER TABLE game_media AUTO_INCREMENT = 1;


INSERT INTO game_media (game_id, image_url, sort_order)
VALUES

-- =========================================
-- 1. Persona 5 Royal
-- =========================================
(1, 'http://10.0.2.2:8080/images/media/persona5/1.jpg', 1),
(1, 'http://10.0.2.2:8080/images/media/persona5/2.jpg', 2),
(1, 'http://10.0.2.2:8080/images/media/persona5/3.jpg', 3),
(1, 'http://10.0.2.2:8080/images/media/persona5/4.jpg', 4),
(1, 'http://10.0.2.2:8080/images/media/persona5/5.jpg', 5),

-- =========================================
-- 2. Wuthering Waves
-- =========================================
(2, 'http://10.0.2.2:8080/images/media/wuthering-waves/1.jpg', 1),
(2, 'http://10.0.2.2:8080/images/media/wuthering-waves/2.jpg', 2),
(2, 'http://10.0.2.2:8080/images/media/wuthering-waves/3.jpg', 3),
(2, 'http://10.0.2.2:8080/images/media/wuthering-waves/4.jpg', 4),
(2, 'http://10.0.2.2:8080/images/media/wuthering-waves/5.jpg', 5),

-- =========================================
-- 3. DOOM Eternal
-- =========================================
(3, 'http://10.0.2.2:8080/images/media/doom-eternal/1.jpg', 1),
(3, 'http://10.0.2.2:8080/images/media/doom-eternal/2.jpg', 2),
(3, 'http://10.0.2.2:8080/images/media/doom-eternal/3.jpg', 3),
(3, 'http://10.0.2.2:8080/images/media/doom-eternal/4.jpg', 4),
(3, 'http://10.0.2.2:8080/images/media/doom-eternal/5.jpg', 5),

-- =========================================
-- 4. Grand Theft Auto V
-- =========================================
(4, 'http://10.0.2.2:8080/images/media/gta5/1.jpg', 1),
(4, 'http://10.0.2.2:8080/images/media/gta5/2.jpg', 2),
(4, 'http://10.0.2.2:8080/images/media/gta5/3.jpg', 3),
(4, 'http://10.0.2.2:8080/images/media/gta5/4.jpg', 4),
(4, 'http://10.0.2.2:8080/images/media/gta5/5.jpg', 5),

-- =========================================
-- 5. Forza Horizon 6
-- =========================================
(5, 'http://10.0.2.2:8080/images/media/forza-horizon-6/1.jpg', 1),
(5, 'http://10.0.2.2:8080/images/media/forza-horizon-6/2.jpg', 2),
(5, 'http://10.0.2.2:8080/images/media/forza-horizon-6/3.jpg', 3),
(5, 'http://10.0.2.2:8080/images/media/forza-horizon-6/4.jpg', 4),
(5, 'http://10.0.2.2:8080/images/media/forza-horizon-6/5.jpg', 5),

-- =========================================
-- 6. Ghost of Tsushima
-- =========================================
(6, 'http://10.0.2.2:8080/images/media/ghost-of-tsushima/1.jpg', 1),
(6, 'http://10.0.2.2:8080/images/media/ghost-of-tsushima/2.jpg', 2),
(6, 'http://10.0.2.2:8080/images/media/ghost-of-tsushima/3.jpg', 3),
(6, 'http://10.0.2.2:8080/images/media/ghost-of-tsushima/4.jpg', 4),
(6, 'http://10.0.2.2:8080/images/media/ghost-of-tsushima/5.jpg', 5),

-- =========================================
-- 7. Palworld
-- =========================================
(7, 'http://10.0.2.2:8080/images/media/palworld/1.jpg', 1),
(7, 'http://10.0.2.2:8080/images/media/palworld/2.jpg', 2),
(7, 'http://10.0.2.2:8080/images/media/palworld/3.jpg', 3),
(7, 'http://10.0.2.2:8080/images/media/palworld/4.jpg', 4),
(7, 'http://10.0.2.2:8080/images/media/palworld/5.jpg', 5),

-- =========================================
-- 8. Baldur's Gate 3
-- =========================================
(8, 'http://10.0.2.2:8080/images/media/baldurs-gate-3/1.jpg', 1),
(8, 'http://10.0.2.2:8080/images/media/baldurs-gate-3/2.jpg', 2),
(8, 'http://10.0.2.2:8080/images/media/baldurs-gate-3/3.jpg', 3),
(8, 'http://10.0.2.2:8080/images/media/baldurs-gate-3/4.jpg', 4),
(8, 'http://10.0.2.2:8080/images/media/baldurs-gate-3/5.jpg', 5),

-- =========================================
-- 9. Sea of Thieves
-- =========================================
(9, 'http://10.0.2.2:8080/images/media/sea-of-thieves/1.jpg', 1),
(9, 'http://10.0.2.2:8080/images/media/sea-of-thieves/2.jpg', 2),
(9, 'http://10.0.2.2:8080/images/media/sea-of-thieves/3.jpg', 3),
(9, 'http://10.0.2.2:8080/images/media/sea-of-thieves/4.jpg', 4),
(9, 'http://10.0.2.2:8080/images/media/sea-of-thieves/5.jpg', 5),

-- =========================================
-- 10. God of War
-- =========================================
(10, 'http://10.0.2.2:8080/images/media/god-of-war/1.jpg', 1),
(10, 'http://10.0.2.2:8080/images/media/god-of-war/2.jpg', 2),
(10, 'http://10.0.2.2:8080/images/media/god-of-war/3.jpg', 3),
(10, 'http://10.0.2.2:8080/images/media/god-of-war/4.jpg', 4),
(10, 'http://10.0.2.2:8080/images/media/god-of-war/5.jpg', 5);
SELECT game_id, COUNT(*) AS media_count
FROM game_media
GROUP BY game_id
ORDER BY game_id;