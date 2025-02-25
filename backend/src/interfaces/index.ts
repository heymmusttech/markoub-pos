export interface CurrentUserPayload {
  sub: number;
  email: string;
  role: string
}


export interface Ticket {
  id: number;
  passengerId: number;
  tripId: number;
  isPaid: boolean;
  seatNumber: number;
  createdAt: Date;
}