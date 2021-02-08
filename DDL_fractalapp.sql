-- Users table create
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

-- Batch table create
CREATE TABLE `batch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `batch_name` varchar(500) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `FOREIGN_USER_idx` (`user_id`),
  CONSTRAINT `FOREIGN_USER` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- Todo table create
CREATE TABLE `todo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `batch_id` int NOT NULL,
  `from_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `to_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_completed` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FOREIGN_BATCH_idx` (`batch_id`),
  CONSTRAINT `FOREIGN_BATCH` FOREIGN KEY (`batch_id`) REFERENCES `batch` (`id`)
);