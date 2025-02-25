import { ApiProperty } from "@nestjs/swagger";

export class CreateTripDto {
  @ApiProperty({
    required: true,
    example: 'Rabat',
    description: 'Departure location',
  })
  departure: string;

  @ApiProperty({
    required: true,
    example: 'Casablanca',
    description: 'Destination location',
  })
  destination: string;

  @ApiProperty({
    required: true,
    example: '2025-02-28',
    description: 'Date of trip',
  })
  date: string;

  @ApiProperty({
    required: true,
    example: '25.00',
    description: 'Price of the trip',
  })
  price: number;

  @ApiProperty({
    required: true,
    example: '2025-02-28T12:00:00',
    description: 'Departure time of the trip',
  })
  departure_time: string;

  @ApiProperty({
    required: true,
    example: '2025-02-28T13:30:00',
    description: 'Destination time of the trip',
  })
  destination_time: string;

  @ApiProperty({
    required: true,
    example: 50,
    description: 'Number of available seats',
  })
  availableSeats: number;
}
