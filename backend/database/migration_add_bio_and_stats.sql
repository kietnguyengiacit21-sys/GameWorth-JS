-- Add bio and stats columns to users table
ALTER TABLE users ADD COLUMN bio TEXT NULL AFTER avatar_url;
ALTER TABLE users ADD COLUMN review_count INT NOT NULL DEFAULT 0 AFTER bio;
ALTER TABLE users ADD COLUMN wishlist_count INT NOT NULL DEFAULT 0 AFTER review_count;
ALTER TABLE users ADD COLUMN average_rating DECIMAL(3,2) NOT NULL DEFAULT 0.00 AFTER wishlist_count;
