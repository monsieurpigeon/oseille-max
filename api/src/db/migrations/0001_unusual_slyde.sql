CREATE TABLE `customer` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `price` (
	`customer_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`value` integer NOT NULL,
	PRIMARY KEY(`customer_id`, `product_id`),
	FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action
);
