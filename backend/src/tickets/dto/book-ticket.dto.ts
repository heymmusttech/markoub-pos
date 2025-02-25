import { ApiProperty } from "@nestjs/swagger";

export class BookSeatDto {
  @ApiProperty({
    required: true,
    example: 1,
    description: 'Passenger ID',
  })
  passengerId: number;

  @ApiProperty({
    required: true,
    example: 1,
    description: 'Trip ID',
  })
  tripId: number;

  @ApiProperty({
    required: false,
    example: 1,
    description: 'Seat Number',
  })
  seatNumber?: number;
}
