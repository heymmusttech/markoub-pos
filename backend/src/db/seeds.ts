import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import { passengers, tickets, trips, users } from './schema';

// Load environment variables
dotenv.config();

// Seed function
async function seed() {
  let connection;
  try {
    // Create database connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const db = drizzle(connection);

    // Drop all data from the tables
    console.log('Dropping existing data...');
    await db.delete(trips).execute(); // Clear the trips table
    await db.delete(users).execute(); // Clear the users table
    await db.delete(passengers).execute(); // Clear the users table
    await db.delete(tickets).execute(); // Clear the users table
    console.log('Existing data dropped successfully!');

    // Seed users
    console.log('Seeding users...');
    await db.insert(users).values([
      {
        name: 'Vendor User',
        email: 'vendor@markoub.ma',
        password: '$2b$10$b.pJFZBky4PwXfzWFPNeo.UR0rW50ea3eD0G9T4P2BBSwqYTD/JGG', // Password is 'P@ssw0rd'
        role: 'vendor',
      },
      {
        name: 'Admin User',
        email: 'admin@markoub.ma',
        password: '$2b$10$b.pJFZBky4PwXfzWFPNeo.UR0rW50ea3eD0G9T4P2BBSwqYTD/JGG', // Password is 'P@ssw0rd'
        role: 'admin',
      },
    ]);
    console.log('Users seeded successfully!');

    // Seed trips
    console.log('Seeding trips...');
    await db.insert(trips).values([
      {
        departure: 'Rabat',
        destination: 'Casablanca',
        date: new Date('2025-02-28'),
        departure_time: new Date('2025-02-28T12:00:00'),
        destination_time: new Date('2025-02-28T13:30:00'),
        price: '25.00',
        availableSeats: 50,
      },
      {
        departure: 'Rabat',
        destination: 'Meknes',
        date: new Date('2025-02-28'),
        departure_time: new Date('2025-02-28T09:00:00'),
        destination_time: new Date('2025-02-28T12:30:00'),
        price: '50.00',
        availableSeats: 30,
      },
    ]);
    console.log('Trips seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:');
    console.error(error);
    process.exit(1); // Exit with a failure code
  } finally {
    // Close the database connection
    if (connection) {
      await connection.end();
    }
  }
}

// Run the seed function
seed();