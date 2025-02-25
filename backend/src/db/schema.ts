import { boolean, datetime, decimal, int, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }).unique(),
  password: varchar('password', { length: 256 }),
  role: varchar('role', { length: 256 }).default('vendor'),
});

// Trips Table
export const trips = mysqlTable('trips', {
  id: int('id').primaryKey().autoincrement(),
  departure: varchar('departure', { length: 100 }).notNull(),
  destination: varchar('destination', { length: 100 }).notNull(),
  date: datetime('date').notNull(),
  departure_time: datetime('departure_time').notNull(),
  destination_time: datetime('destination_time').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  availableSeats: int('available_seats').notNull(),
});

// Passengers Table
export const passengers = mysqlTable('passengers', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull().unique(),
  email: varchar('email', { length: 20 }),
});

// Tickets Table
export const tickets = mysqlTable('tickets', {
  id: int('id').primaryKey().autoincrement(),
  passengerId: int('passenger_id').notNull(),
  tripId: int('trip_id').notNull(),
  isPaid: boolean('is_paid').notNull().default(false), // Ensure this is correct  
  seatNumber: int('seat_number').notNull(),
  ticketPdf: text('ticket_pdf').notNull().default(''),
  createdAt: timestamp('created_at').defaultNow(),
});