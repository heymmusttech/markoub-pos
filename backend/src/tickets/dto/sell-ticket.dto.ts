import { ApiProperty } from "@nestjs/swagger";

export class SellTicketDto {
    @ApiProperty({
        required: true,
        example: 1,
        description: 'Ticket ID',
    })
    ticketId: number;
}