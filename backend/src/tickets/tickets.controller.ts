import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketsService } from './tickets.service';

@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @ApiOperation({ summary: 'Create Ticket: Create a new ticket' })
  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @ApiOperation({ summary: 'Get All Sales: Get all ticket sales' })
  @Get('sales')
  getSales() {
    return this.ticketsService.getPastSales();
  }

  @ApiOperation({ summary: 'Get Sales Records: Get all ticket sales records' })
  @Get('sales-records')
  getSalesRecrods() {
    return this.ticketsService.getSalesRecords();
  }

  // get tickets by id
  @ApiOperation({ summary: 'Get Ticket: Get a ticket by id' })
  @Get(':id')
  getTicketById(@Param('id') id: number) {
    return this.ticketsService.getTicketById(id);
  }

   // confrim paid ticket
   @ApiOperation({ summary: 'Confirm Ticket: Confirm a paid ticket' })
   @Patch('/:ticketId/confirm')
   confirmTicket(@Param('ticketId') ticketId: number) {
     return this.ticketsService.confirmTicketById(ticketId);
   }
}
