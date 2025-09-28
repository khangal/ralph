ALTER TABLE `challenges` ADD `owner_id` text NOT NULL REFERENCES user(id);
