export interface ErrorResponse {
  message: string; // Add other properties if needed
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "vendor" | "admin"; // Adjust roles as needed
}

export interface BreadcrumbElement {
  name: string;
  href: string;
}


export interface BookingTicketPayload {
  name: string;
  phone: string;
  email?: string;
  seatNumber: number;
}

interface Passenger {
  id: number;
  name: string;
  phone: string;
  email: string | null;
}

export interface Trip {
  id: number;
  departure: string;
  destination: string;
  date: string;
  departure_time: string;
  destination_time: string;
  price: string;
  availableSeats: number;
}

export interface Ticket {
  id: number;
  passengerId: number;
  tripId: number;
  isPaid: boolean;
  seatNumber: number;
  createdAt: string;
  passenger: Passenger;
  trip: Trip;
}

export interface SalesRecord {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  passenger: string;
}