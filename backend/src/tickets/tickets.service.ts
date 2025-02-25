import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, eq, InferSelectModel, sql } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { passengers, tickets, trips } from '../db/schema';
import { BookSeatDto } from './dto/book-ticket.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { GeneratePdfTicketProvider } from './providers/generate-pdf-ticket.provider';

type Ticket = InferSelectModel<typeof tickets>;

@Injectable()
export class TicketsService {
  constructor(
    @Inject('DATABASE_CONNECTION') private db: MySql2Database,
    private readonly generatePdfTicketProvider: GeneratePdfTicketProvider, // Inject TicketService
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    let passengerId: number;
    // Check if the passenger exists
    const passenger = await this.db
      .select()
      .from(passengers)
      .where(eq(passengers.phone, createTicketDto.phone))
      .execute();

    passengerId = passenger[0]?.id;

    if (!passenger[0]) {
      // Create a new passenger
      const [result] = await this.db
        .insert(passengers)
        .values({
          name: createTicketDto.name,
          phone: createTicketDto.phone,
          // email: createTicketDto?.email || null,
        })
        .execute();

      passengerId = result.insertId;
    }

    const bookedSeats = await this.db
      .select()
      .from(tickets)
      .where(
        and(
          eq(tickets.seatNumber, +createTicketDto.seatNumber),
          eq(tickets.tripId, +createTicketDto.tripId),
        ),
      )
      .execute();

    if (bookedSeats.length) {
      throw new ConflictException('Seat is already booked');
    }

    const [result] = await this.db
      .insert(tickets)
      .values({
        passengerId,
        tripId: createTicketDto.tripId,
        seatNumber: createTicketDto.seatNumber,
      })
      .execute();

    const createdTicket = await this.db
      .select()
      .from(tickets)
      .where(eq(tickets.id, result.insertId))
      .execute();

    return createdTicket[0];
  }

  async bookSeat(bookSeatDto: BookSeatDto) {
    const { passengerId, tripId, seatNumber } = bookSeatDto;

    // Check if the trip exists
    const trip = await this.db
      .select()
      .from(trips)
      .where(eq(trips.id, tripId))
      .execute();

    if (!trip[0]) {
      throw new NotFoundException('Trip not found');
    }

    // Get all booked seats for the trip
    const bookedSeats = await this.db
      .select({ seatNumber: tickets.seatNumber })
      .from(tickets)
      .where(eq(tickets.tripId, tripId))
      .execute();

    const bookedSeatNumbers = bookedSeats.map((seat) => seat.seatNumber);

    // Determine the seat number
    let finalSeatNumber = seatNumber;
    if (!finalSeatNumber) {
      const totalSeats = trip[0].availableSeats;
      do {
        finalSeatNumber = Math.floor(Math.random() * totalSeats) + 1;
      } while (bookedSeatNumbers.includes(finalSeatNumber));
    } else if (bookedSeatNumbers.includes(finalSeatNumber)) {
      throw new Error('Seat is already booked');
    }

    // Decrement available seats
    await this.db
      .update(trips)
      .set({ availableSeats: trip[0].availableSeats - 1 })
      .where(eq(trips.id, tripId))
      .execute();

    // Create a ticket with only the fields that exist in the schema
    return this.db
      .insert(tickets)
      .values({
        passengerId,
        tripId,
        seatNumber: finalSeatNumber,
      })
      .execute();
  }

  async getTicketById(id: number) {
    // Fetch the ticket, passenger, and trip details in a single query using joins
    const result = await this.db
      .select({
        ticket: tickets,
        passenger: passengers,
        trip: trips,
      })
      .from(tickets)
      .leftJoin(passengers, eq(tickets.passengerId, passengers.id))
      .leftJoin(trips, eq(tickets.tripId, trips.id))
      .where(eq(tickets.id, id))
      .execute();

    if (result.length === 0) {
      throw new NotFoundException('Ticket not found');
    }

    const { ticket, passenger, trip } = result[0];

    return {
      ...ticket,
      passenger,
      trip,
    };
  }

  async confirmTicketById(id: number) {
    // Fetch the ticket, passenger, and trip details in a single query using joins
    const result = await this.db
      .select({
        ticket: tickets,
        passenger: passengers,
        trip: trips,
      })
      .from(tickets)
      .leftJoin(passengers, eq(tickets.passengerId, passengers.id))
      .leftJoin(trips, eq(tickets.tripId, trips.id))
      .where(eq(tickets.id, id))
      .execute();

    if (result.length === 0) {
      throw new NotFoundException('Ticket not found');
    }

    const { ticket, passenger, trip } = result[0];

    const pdfBase64String = await this.generatePdfTicketProvider.generateTicket(
      passenger.name, // Customer name
      trip.date, // Ticket date
      +trip.price, // Trip price
      trip.departure, // Trip start location
    );

    // Update the ticket
    await this.db
      .update(tickets)
      .set({ isPaid: true, ticketPdf: pdfBase64String } as Partial<Ticket>)
      .where(eq(tickets.id, id))
      .execute();

    // Return the confirmation details and the PDF ticket
    return {
      ticket: {
        ...ticket,
        passenger,
        trip,
      },
      pdfTicket: pdfBase64String, // Return the PDF as a buffer or base64 string
    };
  }

  async getSales() {
    return this.db.select().from(tickets);
  }

  async getPastSales() {
    return this.db
      .select({
        ticketId: tickets.id,
        passenger: {
          name: passengers.name,
          phone: passengers.phone,
          email: passengers.email,
        },
        trip: {
          departure: trips.departure,
          destination: trips.destination,
          departure_time: trips.departure_time,
          destination_time: trips.destination_time,
          date: trips.date,
          price: trips.price,
        },
        isPaid: tickets.isPaid,
      })
      .from(tickets)
      .leftJoin(passengers, eq(tickets.passengerId, passengers.id))
      .leftJoin(trips, eq(tickets.tripId, trips.id))
      .execute();
  }

  async getSalesRecords() {
    const salesData = await this.db
      .select({
        totalPaid: sql<number>`SUM(CASE WHEN ${tickets.isPaid} = TRUE THEN ${trips.price} ELSE 0 END)`,
        totalUnpaid: sql<number>`SUM(CASE WHEN ${tickets.isPaid} = FALSE THEN ${trips.price} ELSE 0 END)`,
        countPaid: sql<number>`COUNT(CASE WHEN ${tickets.isPaid} = TRUE THEN 1 END)`,
        countUnpaid: sql<number>`COUNT(CASE WHEN ${tickets.isPaid} = FALSE THEN 1 END)`,
      })
      .from(tickets)
      .leftJoin(trips, eq(tickets.tripId, trips.id))
      .execute();

    const soldTickets = await this.db
      .select({
        ticketId: tickets.id,
        passenger: {
          name: passengers.name,
          phone: passengers.phone,
          email: passengers.email,
        },
        trip: {
          departure: trips.departure,
          destination: trips.destination,
          date: trips.date,
          departure_time: trips.departure_time,
          destination_time: trips.destination_time,
          price: trips.price,
        },
        isPaid: tickets.isPaid,
      })
      .from(tickets)
      .leftJoin(passengers, eq(tickets.passengerId, passengers.id))
      .leftJoin(trips, eq(tickets.tripId, trips.id))
      // .where(eq(tickets.isPaid, true))
      .execute();

    return {
      salesData: {
        paid: {
          count: salesData[0].countPaid || 0,
          total: salesData[0].totalPaid || 0,
        },
        unpaid: {
          count: salesData[0].countUnpaid || 0,
          total: salesData[0].totalUnpaid || 0,
        }
      },
      tickets: {
        count: soldTickets.length,
        items: soldTickets,
      }
    };
  }
}
