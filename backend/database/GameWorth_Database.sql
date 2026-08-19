CREATE DATABASE  IF NOT EXISTS `gameworth` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gameworth`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gameworth
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `game_media`
--

DROP TABLE IF EXISTS `game_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_media` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `game_id` bigint NOT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_game_media_order` (`game_id`,`sort_order`),
  CONSTRAINT `fk_game_media_game` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_media`
--

LOCK TABLES `game_media` WRITE;
/*!40000 ALTER TABLE `game_media` DISABLE KEYS */;
INSERT INTO `game_media` VALUES (1,1,'http://10.0.2.2:8080/images/media/persona5/1.jpg',1),(2,1,'http://10.0.2.2:8080/images/media/persona5/2.jpg',2),(3,1,'http://10.0.2.2:8080/images/media/persona5/3.jpg',3),(4,1,'http://10.0.2.2:8080/images/media/persona5/4.jpg',4),(5,1,'http://10.0.2.2:8080/images/media/persona5/5.jpg',5),(6,2,'http://10.0.2.2:8080/images/media/wuthering-waves/1.jpg',1),(7,2,'http://10.0.2.2:8080/images/media/wuthering-waves/2.jpg',2),(8,2,'http://10.0.2.2:8080/images/media/wuthering-waves/3.jpg',3),(9,2,'http://10.0.2.2:8080/images/media/wuthering-waves/4.jpg',4),(10,2,'http://10.0.2.2:8080/images/media/wuthering-waves/5.jpg',5),(11,3,'http://10.0.2.2:8080/images/media/doom-eternal/1.jpg',1),(12,3,'http://10.0.2.2:8080/images/media/doom-eternal/2.jpg',2),(13,3,'http://10.0.2.2:8080/images/media/doom-eternal/3.jpg',3),(14,3,'http://10.0.2.2:8080/images/media/doom-eternal/4.jpg',4),(15,3,'http://10.0.2.2:8080/images/media/doom-eternal/5.jpg',5),(16,4,'http://10.0.2.2:8080/images/media/gta5/1.jpg',1),(17,4,'http://10.0.2.2:8080/images/media/gta5/2.jpg',2),(18,4,'http://10.0.2.2:8080/images/media/gta5/3.jpg',3),(19,4,'http://10.0.2.2:8080/images/media/gta5/4.jpg',4),(20,4,'http://10.0.2.2:8080/images/media/gta5/5.jpg',5),(21,5,'http://10.0.2.2:8080/images/media/forza-horizon-6/1.jpg',1),(22,5,'http://10.0.2.2:8080/images/media/forza-horizon-6/2.jpg',2),(23,5,'http://10.0.2.2:8080/images/media/forza-horizon-6/3.jpg',3),(24,5,'http://10.0.2.2:8080/images/media/forza-horizon-6/4.jpg',4),(25,5,'http://10.0.2.2:8080/images/media/forza-horizon-6/5.jpg',5),(26,6,'http://10.0.2.2:8080/images/media/ghost-of-tsushima/1.jpg',1),(27,6,'http://10.0.2.2:8080/images/media/ghost-of-tsushima/2.jpg',2),(28,6,'http://10.0.2.2:8080/images/media/ghost-of-tsushima/3.jpg',3),(29,6,'http://10.0.2.2:8080/images/media/ghost-of-tsushima/4.jpg',4),(30,6,'http://10.0.2.2:8080/images/media/ghost-of-tsushima/5.jpg',5),(31,7,'http://10.0.2.2:8080/images/media/palworld/1.jpg',1),(32,7,'http://10.0.2.2:8080/images/media/palworld/2.jpg',2),(33,7,'http://10.0.2.2:8080/images/media/palworld/3.jpg',3),(34,7,'http://10.0.2.2:8080/images/media/palworld/4.jpg',4),(35,7,'http://10.0.2.2:8080/images/media/palworld/5.jpg',5),(36,8,'http://10.0.2.2:8080/images/media/baldurs-gate-3/1.jpg',1),(37,8,'http://10.0.2.2:8080/images/media/baldurs-gate-3/2.jpg',2),(38,8,'http://10.0.2.2:8080/images/media/baldurs-gate-3/3.jpg',3),(39,8,'http://10.0.2.2:8080/images/media/baldurs-gate-3/4.jpg',4),(40,8,'http://10.0.2.2:8080/images/media/baldurs-gate-3/5.jpg',5),(41,9,'http://10.0.2.2:8080/images/media/sea-of-thieves/1.jpg',1),(42,9,'http://10.0.2.2:8080/images/media/sea-of-thieves/2.jpg',2),(43,9,'http://10.0.2.2:8080/images/media/sea-of-thieves/3.jpg',3),(44,9,'http://10.0.2.2:8080/images/media/sea-of-thieves/4.jpg',4),(45,9,'http://10.0.2.2:8080/images/media/sea-of-thieves/5.jpg',5),(46,10,'http://10.0.2.2:8080/images/media/god-of-war/1.jpg',1),(47,10,'http://10.0.2.2:8080/images/media/god-of-war/2.jpg',2),(48,10,'http://10.0.2.2:8080/images/media/god-of-war/3.jpg',3),(49,10,'http://10.0.2.2:8080/images/media/god-of-war/4.jpg',4),(50,10,'http://10.0.2.2:8080/images/media/god-of-war/5.jpg',5);
/*!40000 ALTER TABLE `game_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `developer` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publisher` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genre` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `platform` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `cover_image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trailer_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `minimum_requirements` text COLLATE utf8mb4_unicode_ci,
  `recommended_requirements` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'Persona 5 Royal','A story-driven role-playing game about students living a double life as Phantom Thieves.','Atlus','SEGA','RPG','PC, PlayStation, Xbox, Switch','2022-10-21',59.99,'http://10.0.2.2:8080/images/persona5-v2.png',NULL,'Windows 10, Intel Core i7-4790, 8 GB RAM, GTX 650 Ti','Windows 10, Intel Core i7-4790, 8 GB RAM, GTX 760','2026-08-15 23:37:04','2026-08-15 23:39:00'),(2,'Wuthering Waves','An open-world action RPG featuring fast combat and character collection.','Kuro Games','Kuro Games','Action RPG','PC, Mobile','2024-05-22',0.00,'http://10.0.2.2:8080/images/wuthering-waves.jpg',NULL,'Windows 10, Intel Core i5, 16 GB RAM','Windows 10, Intel Core i7, 16 GB RAM, RTX-class GPU','2026-08-15 23:37:04','2026-08-15 23:37:04'),(3,'DOOM Eternal','A fast-paced first-person shooter focused on aggressive combat.','id Software','Bethesda Softworks','FPS','PC, PlayStation, Xbox, Switch','2020-03-20',39.99,'http://10.0.2.2:8080/images/doom-eternal.jpg',NULL,'Windows 7 64-bit, Intel Core i5, 8 GB RAM, GTX 1050 Ti','Windows 10 64-bit, Intel Core i7, 8 GB RAM, GTX 1060','2026-08-15 23:37:04','2026-08-15 23:37:04'),(4,'Grand Theft Auto V','An open-world action game set in Los Santos, featuring a large story campaign, vehicles, missions and exploration.','Rockstar Games','Rockstar Games','Action, Open World','PC, PlayStation, Xbox','2015-04-14',29.99,'http://10.0.2.2:8080/images/gta5.jpg',NULL,'Windows 10, Intel Core i5-3470, 8 GB RAM, NVIDIA GTX 660 2 GB, 120 GB storage','Windows 10, Intel Core i5-4460, 16 GB RAM, NVIDIA GTX 1060 6 GB, 120 GB storage','2026-08-15 23:37:04','2026-08-15 23:37:04'),(5,'Forza Horizon 6','An open-world racing game set in Japan with hundreds of cars, racing events and free-roam exploration.','Playground Games','Xbox Game Studios','Racing, Open World','PC, Xbox Series X|S','2026-05-19',69.99,'http://10.0.2.2:8080/images/forza-horizon-6.jpg',NULL,'Windows 10, Intel Core i5-8400, 16 GB RAM, NVIDIA GTX 1060 6 GB, 110 GB storage','Windows 11, Intel Core i7-10700K, 16 GB RAM, NVIDIA RTX 3070, 110 GB storage','2026-08-15 23:37:04','2026-08-15 23:37:04'),(6,'Ghost of Tsushima Director\'s Cut','An open-world action adventure following samurai Jin Sakai as he fights to defend Tsushima.','Sucker Punch Productions','PlayStation Publishing LLC','Action Adventure','PC, PlayStation','2024-05-16',59.99,'http://10.0.2.2:8080/images/ghost-of-tsushima.jpg',NULL,'Windows 10, Intel Core i3-7100, 8 GB RAM, NVIDIA GTX 960 4 GB, 75 GB storage','Windows 10, Intel Core i5-8600, 16 GB RAM, NVIDIA RTX 2060, 75 GB storage','2026-08-15 23:37:04','2026-08-15 23:37:04'),(7,'Palworld','An open-world survival and crafting game where players explore, build bases and collect creatures known as Pals.','Pocketpair','Pocketpair','Survival, Open World','PC, Xbox, PlayStation','2026-07-09',29.99,'http://10.0.2.2:8080/images/palworld.jpg',NULL,'Windows 10, Intel Core i5-3570K, 16 GB RAM, NVIDIA GTX 1050, 40 GB storage','Windows 10, Intel Core i9-9900K, 32 GB RAM, NVIDIA RTX 2070, 40 GB storage','2026-08-15 23:37:04','2026-08-15 23:37:04'),(8,'Baldur\'s Gate 3','A story-driven role-playing game based on Dungeons and Dragons with tactical combat, exploration and player choices.','Larian Studios','Larian Studios','RPG','PC, PlayStation, Xbox','2023-08-03',59.99,'http://10.0.2.2:8080/images/baldurs-gate-3-v2.png',NULL,'Windows 10, Intel Core i5-4690, 8 GB RAM, NVIDIA GTX 970, 150 GB storage','Windows 10, Intel Core i7-8700K, 16 GB RAM, NVIDIA RTX 2060 SUPER, 150 GB storage','2026-08-15 23:37:04','2026-08-15 23:39:03'),(9,'Sea of Thieves','A multiplayer pirate adventure focused on sailing, treasure hunting, exploration and battles at sea.','Rare Ltd','Xbox Game Studios','Adventure, Multiplayer','PC, Xbox, PlayStation','2020-06-03',39.99,'http://10.0.2.2:8080/images/sea-of-thieves.jpg',NULL,'Windows 10, Intel Core i5-4690, 8 GB RAM, NVIDIA GTX 650, 100 GB storage','Windows 10, Intel Core i7-4790, 16 GB RAM, NVIDIA GTX 1060, 100 GB storage','2026-08-15 23:37:04','2026-08-15 23:37:04'),(10,'God of War','An action adventure following Kratos and his son Atreus on a journey through the world of Norse mythology.','Santa Monica Studio','PlayStation Publishing LLC','Action Adventure','PC, PlayStation','2022-01-14',49.99,'http://10.0.2.2:8080/images/god-of-war.jpg',NULL,'Windows 10, Intel Core i5-2500K, 8 GB RAM, NVIDIA GTX 960, 70 GB storage','Windows 10, Intel Core i5-6600K, 8 GB RAM, NVIDIA GTX 1060, 70 GB storage','2026-08-15 23:37:04','2026-08-15 23:37:04');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `token_hash` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_password_reset_tokens_token_hash` (`token_hash`),
  KEY `fk_password_reset_tokens_user` (`user_id`),
  CONSTRAINT `fk_password_reset_tokens_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `game_id` bigint NOT NULL,
  `rating` tinyint NOT NULL,
  `verdict` enum('WORTH_IT','NOT_WORTH_IT') COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_reviews_user_game` (`user_id`,`game_id`),
  KEY `fk_reviews_game` (`game_id`),
  CONSTRAINT `fk_reviews_game` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reviews_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chk_reviews_rating` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,101,1,5,'WORTH_IT','Amazing characters, stylish combat and one of the best soundtracks I have heard in an RPG.','2026-08-14 14:55:07','2026-08-14 14:55:07'),(2,101,2,4,'WORTH_IT','The combat feels incredibly smooth and the movement system makes exploring the world genuinely fun.','2026-08-11 14:55:07','2026-08-11 14:55:07'),(3,101,3,5,'WORTH_IT','Fast, brutal and extremely satisfying. The combat loop never gets old.','2026-08-07 14:55:07','2026-08-07 14:55:07'),(4,102,4,4,'WORTH_IT','Still one of the most entertaining open worlds to mess around in. The campaign holds up surprisingly well.','2026-08-15 14:55:07','2026-08-15 14:55:07'),(5,102,5,3,'NOT_WORTH_IT','The driving is fun but the progression feels too generous. I rarely feel like I earned the cars.','2026-08-09 14:55:07','2026-08-09 14:55:07'),(6,102,6,5,'WORTH_IT','Beautiful world, satisfying sword combat and a story that kept me invested until the end.','2026-08-04 14:55:07','2026-08-04 14:55:07'),(7,103,7,4,'WORTH_IT','A ridiculous combination of survival crafting and creature collecting that somehow works.','2026-08-13 14:55:07','2026-08-13 14:55:07'),(8,103,8,5,'WORTH_IT','The amount of freedom in quests and conversations is insane. Every playthrough feels different.','2026-08-06 14:55:07','2026-08-06 14:55:07'),(9,104,9,4,'WORTH_IT','Sailing with friends is fantastic. The best moments usually come from completely unexpected encounters.','2026-08-12 14:55:07','2026-08-12 14:55:07'),(10,104,10,5,'WORTH_IT','Kratos and Atreus carry an incredible story, and the combat has much more depth than I expected.','2026-08-08 14:55:07','2026-08-08 14:55:07'),(11,104,1,3,'NOT_WORTH_IT','Great style and characters, but the pacing is too slow for me and some sections feel unnecessarily long.','2026-07-29 14:55:07','2026-07-29 14:55:07'),(12,105,2,5,'WORTH_IT','Combat animations are fantastic and perfect dodges feel incredibly satisfying. Easily my favorite part of the game.','2026-08-15 14:55:07','2026-08-15 14:55:07'),(13,105,3,4,'WORTH_IT','Fantastic combat and soundtrack. Some encounters become exhausting, but overall it is excellent.','2026-08-03 14:55:07','2026-08-03 14:55:07'),(14,106,4,2,'NOT_WORTH_IT','The world is impressive but I have played it too many times. It no longer feels worth buying at full price.','2026-08-10 14:55:07','2026-08-10 14:55:07'),(15,106,5,4,'WORTH_IT','Driving across the map is relaxing and the car selection is excellent. Great game to play casually.','2026-08-05 14:55:07','2026-08-05 14:55:07'),(16,106,6,4,'WORTH_IT','The environments are absolutely gorgeous. Combat becomes repetitive eventually, but the journey is worth it.','2026-07-27 14:55:07','2026-07-27 14:55:07'),(17,107,7,3,'NOT_WORTH_IT','The concept is great but the survival systems still feel rough around the edges.','2026-08-14 14:55:07','2026-08-14 14:55:07'),(18,107,8,5,'WORTH_IT','One of the few games where choices genuinely make me stop and think before clicking an option.','2026-08-02 14:55:07','2026-08-02 14:55:07'),(19,107,9,4,'WORTH_IT','Not something I would play alone, but with friends it creates some unforgettable moments.','2026-07-24 14:55:07','2026-07-24 14:55:07'),(20,108,10,4,'WORTH_IT','Excellent storytelling and presentation. A few enemy types repeat too often, but the overall experience is fantastic.','2026-08-11 14:55:07','2026-08-11 14:55:07'),(21,108,1,5,'WORTH_IT','The style is unmatched. Music, menus, combat and character design all work together perfectly.','2026-07-31 14:55:07','2026-07-31 14:55:07'),(22,109,2,3,'NOT_WORTH_IT','Great combat but the story has not grabbed me yet. I would recommend trying it before spending too much time.','2026-08-13 14:55:07','2026-08-13 14:55:07'),(23,109,5,5,'WORTH_IT','One of the best games to play when I just want to drive around, listen to music and relax.','2026-08-01 14:55:07','2026-08-01 14:55:07'),(24,109,9,5,'WORTH_IT','Nothing else gives me the same feeling of sailing into the unknown with a crew of friends.','2026-07-22 14:55:07','2026-07-22 14:55:07'),(25,110,3,5,'WORTH_IT','Every weapon encourages aggression and movement. This is exactly what an action FPS should feel like.','2026-08-12 14:55:07','2026-08-12 14:55:07'),(26,110,6,3,'NOT_WORTH_IT','The presentation is incredible but some open-world activities become repetitive after several hours.','2026-07-30 14:55:07','2026-07-30 14:55:07'),(27,110,10,5,'WORTH_IT','Combat, story and production quality are all excellent. The final hours are especially strong.','2026-07-26 14:55:07','2026-07-26 14:55:07'),(32,1,2,5,'NOT_WORTH_IT','Nice game','2026-08-16 15:20:35','2026-08-16 15:53:16'),(34,1,6,3,'WORTH_IT',NULL,'2026-08-16 15:37:14','2026-08-16 15:37:14'),(38,111,1,3,'WORTH_IT',NULL,'2026-08-16 18:16:37','2026-08-16 18:16:37');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `review_count` int NOT NULL DEFAULT '0',
  `wishlist_count` int NOT NULL DEFAULT '0',
  `average_rating` decimal(3,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'cena@gmail.com','$2b$10$NG08Yielar9ghrdartzUYOSlxZDNL6utNhNVv1Y5a2CzY7.zo30uG','John Cena',NULL,'real gay fat fuck','2026-08-15 23:39:53','2026-08-16 15:53:04',2,0,4.00),(101,'phantom_ace','phantom101@gameworth.test','$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.','PhantomAce',NULL,'RPG enjoyer and professional backlog collector.','2026-08-16 14:55:07','2026-08-16 14:55:07',3,0,4.67),(102,'nova_strike','nova102@gameworth.test','$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.','NovaStrike',NULL,'Fast games, big explosions, no patience.','2026-08-16 14:55:07','2026-08-16 14:55:07',3,0,4.00),(103,'pixel_knight','pixel103@gameworth.test','$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.','PixelKnight',NULL,'Mostly RPGs and survival games.','2026-08-16 14:55:07','2026-08-16 14:55:07',2,0,4.50),(104,'iron_wolf','iron104@gameworth.test','$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.','IronWolf',NULL,'Story first. Everything else comes second.','2026-08-16 14:55:07','2026-08-16 14:55:07',3,0,4.00),(105,'zero_frame','zero105@gameworth.test','$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.','ZeroFrame',NULL,'I rate games harder than my professors.','2026-08-16 14:55:07','2026-08-16 14:55:07',2,0,4.50),(106,'night_runner','night106@gameworth.test','$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.','NightRunner',NULL,'Open worlds, racing and late night gaming.','2026-08-16 14:55:07','2026-08-16 14:55:07',3,0,3.33),(107,'crimson_echo','crimson107@gameworth.test','$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.','CrimsonEcho',NULL,'Good combat can save almost anything.','2026-08-16 14:55:07','2026-08-16 14:55:07',3,0,4.00),(108,'arcane_fox','arcane108@gameworth.test','$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.','ArcaneFox',NULL,'Mostly single-player games and RPGs.','2026-08-16 14:55:07','2026-08-16 14:55:07',2,0,4.50),(109,'voidwalker','void109@gameworth.test','$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.','VoidWalker',NULL,'Exploration, atmosphere and good music.','2026-08-16 14:55:07','2026-08-16 14:55:07',3,0,4.33),(110,'stormblade','storm110@gameworth.test','$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.','StormBlade',NULL,'Action games and difficult bosses.','2026-08-16 14:55:07','2026-08-16 14:55:07',3,0,4.33),(111,'DoomSlayer','testuser01@gmail.com','$2b$10$KCHkzgzsmKgsxW/pNzxs9e.erLJ/xxUMc6k16hGhTUhUN1aRtKELu','Test User','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKg-tjtCaRrTF4fRGJxjZ496KkFIUPskmevY-XcmO5yg&s=10','I love shooting','2026-08-16 17:45:44','2026-08-16 18:29:09',1,0,3.00),(112,'supermanbest','testuser02@gmail.com','$2b$10$jqVY4Wd3eqJb1kOMEZW4Z.nNZQdWKufrPEZc47h01Ze9St/46qv6a','Clark Kent',NULL,'I am an extreme gamer with best skills ever','2026-08-16 18:31:02','2026-08-16 18:34:56',0,0,0.00);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'gameworth'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-16 18:54:25
