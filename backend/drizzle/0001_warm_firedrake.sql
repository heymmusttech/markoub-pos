ALTER TABLE `passengers` MODIFY COLUMN `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `passengers` ADD CONSTRAINT `passengers_phone_unique` UNIQUE(`phone`);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);