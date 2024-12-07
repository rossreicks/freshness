CREATE TABLE `category` (
	`id` integer PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`type` text,
	`icon_path` text,
	`icon_link` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_slug_unique` ON `category` (`slug`);--> statement-breakpoint
CREATE TABLE `images` (
	`id` integer PRIMARY KEY NOT NULL,
	`oid` text NOT NULL,
	`step_id` integer NOT NULL,
	`link` text,
	`path` text,
	`caption` text,
	FOREIGN KEY (`step_id`) REFERENCES `steps`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `images_oid_unique` ON `images` (`oid`);--> statement-breakpoint
CREATE TABLE `ingredients` (
	`id` integer PRIMARY KEY NOT NULL,
	`oid` text NOT NULL,
	`recipe_id` integer NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ingredients_oid_unique` ON `ingredients` (`oid`);--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` integer PRIMARY KEY NOT NULL,
	`oid` text NOT NULL,
	`category_id` integer NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`headline` text,
	`description` text,
	`difficulty` text,
	`prep_time` text,
	`total_time` text,
	`image_path` text,
	`card_link` text,
	`average_rating` text,
	`ratings_count` text,
	`favorites_count` text,
	`is_premium` text,
	`website_url` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `recipes_oid_unique` ON `recipes` (`oid`);--> statement-breakpoint
CREATE TABLE `steps` (
	`id` integer PRIMARY KEY NOT NULL,
	`oid` text NOT NULL,
	`recipe_id` integer NOT NULL,
	`index` integer NOT NULL,
	`instructions` text NOT NULL,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `steps_oid_unique` ON `steps` (`oid`);--> statement-breakpoint
CREATE TABLE `timers` (
	`id` integer PRIMARY KEY NOT NULL,
	`oid` text NOT NULL,
	`step_id` integer NOT NULL,
	`name` text,
	`duration` text,
	`temperature` text,
	`temperature_unit` text,
	`oven_mode` text,
	FOREIGN KEY (`step_id`) REFERENCES `steps`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `timers_oid_unique` ON `timers` (`oid`);--> statement-breakpoint
CREATE TABLE `utensils` (
	`id` integer PRIMARY KEY NOT NULL,
	`oid` text NOT NULL,
	`recipe_id` integer NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `utensils_oid_unique` ON `utensils` (`oid`);