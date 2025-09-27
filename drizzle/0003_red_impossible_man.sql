PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_challenges` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`tenant_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_challenges`("id", "title", "description", "tenant_id", "created_at", "updated_at") SELECT "id", "title", "description", "tenant_id", "created_at", "updated_at" FROM `challenges`;--> statement-breakpoint
DROP TABLE `challenges`;--> statement-breakpoint
ALTER TABLE `__new_challenges` RENAME TO `challenges`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_tenants` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_tenants`("id", "slug", "created_at", "updated_at") SELECT "id", "slug", "created_at", "updated_at" FROM `tenants`;--> statement-breakpoint
DROP TABLE `tenants`;--> statement-breakpoint
ALTER TABLE `__new_tenants` RENAME TO `tenants`;--> statement-breakpoint
CREATE UNIQUE INDEX `tenants_slug_unique` ON `tenants` (`slug`);