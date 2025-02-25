import { ApiProperty } from "@nestjs/swagger";

export class CreatePassengerDto {
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
}
