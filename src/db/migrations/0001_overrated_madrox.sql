CREATE TABLE `customers` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text(256) NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
