import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { GeneratePdfTicketProvider } from './providers/generate-pdf-ticket.provider';

@Module({
  providers: [TicketsService, GeneratePdfTicketProvider],
  controllers: [TicketsController]
})
export class TicketsModule {}
