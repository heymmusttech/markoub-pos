import { ApiProperty } from "@nestjs/swagger";

export class CreateTicketDto {
    @ApiProperty({
        required: true,
        example: 'Mark',
        description: 'Passenger Name',
    })
    name: string;

    @ApiProperty({
        required: true,
        example: '+212691501501',
        description: 'Passenger Phone',
    })
    phone: string;

    @ApiProperty({
        example: 'mark@exemple.ma',
        description: 'Passenger Email',
    })
    email?: string;

    @ApiProperty({
        required: true,
        example: 1,
        description: 'Trip ID',
    })
    tripId: number;

    @ApiProperty({
        required: true,
        example: 1,
        description: 'Seat Number',
    })
    seatNumber: number; 
}
