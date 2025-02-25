import { Inject, Injectable } from '@nestjs/common';
import { and, eq, gte, lte } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { tickets, trips } from '../db/schema';
import { CreateTripDto } from './dto/create-trip.dto';
import { SearchTripDto } from './dto/search-trip.dto';

@Injectable()
export class TripsService {
  constructor(@Inject('DATABASE_CONNECTION') private db: MySql2Database) {}

  async getAll() {
    return this.db.select().from(trips).execute();
  }

  async create(createTripDto: CreateTripDto) {
    const tripData = {
      ...createTripDto,
      price: createTripDto.price.toString(),
      date: new Date(createTripDto.date),
      departure_time: new Date(createTripDto.departure_time),
      destination_time: new Date(createTripDto.destination_time),
    };
    const [result] = await this.db.insert(trips).values(tripData).execute();

    const createdTrip = await this.db
      .select()
      .from(trips)
      .where(eq(trips.id, result.insertId))
      .execute();

    return createdTrip[0];
  }

  async search(searchTripDto: SearchTripDto) {
    const conditions = [];

    if (searchTripDto.departure) {
      conditions.push(eq(trips.departure, searchTripDto.departure));
    }
    if (searchTripDto.destination) {
      conditions.push(eq(trips.destination, searchTripDto.destination));
    }
    if (searchTripDto.date) {
      // Ensure date is a Date object
      const dateValue =
        searchTripDto.date instanceof Date
          ? searchTripDto.date
          : new Date(searchTripDto.date);

      // Set start of the day (00:00:00)
      const startOfDay = new Date(dateValue);
      startOfDay.setHours(0, 0, 0, 0);

      // Set end of the day (23:59:59)
      const endOfDay = new Date(dateValue);
      endOfDay.setHours(23, 59, 59, 999);

      // Use range query: trips.date BETWEEN startOfDay AND endOfDay
      conditions.push(
        and(gte(trips.date, startOfDay), lte(trips.date, endOfDay)),
      );
    }

    return this.db
      .select()
      .from(trips)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .execute();
  }

  async getBookedSeats(tripId: number) {
    const bookedSeats = await this.db
      .select({ seatNumber: tickets.seatNumber })
      .from(tickets)
      .where(eq(tickets.tripId, tripId))
      .execute();

    return {
      tripId,
      bookedSeats: bookedSeats.map((seat) => seat.seatNumber),
    };
  }
}
