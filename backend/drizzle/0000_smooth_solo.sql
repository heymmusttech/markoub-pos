CREATE TABLE `passengers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`phone` varchar(20) NOT NULL,
	CONSTRAINT `passengers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tickets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`passenger_id` int NOT NULL,
	`trip_id` int NOT NULL,
	`is_paid` boolean NOT NULL DEFAULT false,
	`seat_number` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `tickets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trips` (
	`id` int AUTO_INCREMENT NOT NULL,
	`departure` varchar(100) NOT NULL,
	`destination` varchar(100) NOT NULL,
	`date` datetime NOT NULL,
	`departure_time` datetime NOT NULL,
	`destination_time` datetime NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`available_seats` int NOT NULL,
	CONSTRAINT `trips_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`email` varchar(256),
	`password` varchar(256),
	`role` varchar(256) DEFAULT 'vendor',
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
