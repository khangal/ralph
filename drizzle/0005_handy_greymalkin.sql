CREATE TABLE `completions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`challenge_id` text NOT NULL,
	`completed_at` integer,
	`tenant_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`challenge_id`) REFERENCES `challenges`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `user_challenges`;