PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_challenges` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`tenant_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_challenges`("id", "title", "description", "tenant_id", "created_at", "updated_at") SELECT "id", "title", "description", "tenant_id", "created_at", "updated_at" FROM `challenges`;--> statement-breakpoint
DROP TABLE `challenges`;--> statement-breakpoint
ALTER TABLE `__new_challenges` RENAME TO `challenges`;--> statement-breakpoint
PRAGMA foreign_keys=ON;