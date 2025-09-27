PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_completions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`challenge_id` text NOT NULL,
	`completed_at` integer,
	`tenant_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`challenge_id`) REFERENCES `challenges`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_completions`("id", "user_id", "challenge_id", "completed_at", "tenant_id", "created_at", "updated_at") SELECT "id", "user_id", "challenge_id", "completed_at", "tenant_id", "created_at", "updated_at" FROM `completions`;--> statement-breakpoint
DROP TABLE `completions`;--> statement-breakpoint
ALTER TABLE `__new_completions` RENAME TO `completions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;