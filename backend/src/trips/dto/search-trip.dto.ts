import { ApiProperty } from "@nestjs/swagger";

export class SearchTripDto {
  @ApiProperty({
    required: false,
    example: 'Rabat',
    description: 'Departure location',
  })
  departure?: string;

  @ApiProperty({
    required: false,
    example: 'Casablanca',
    description: 'Destination location',
  })
  destination?: string;

  @ApiProperty({
    required: false,
    example: '2025-02-28',
    description: 'Date of trip',
  })
  date?: Date;
}
