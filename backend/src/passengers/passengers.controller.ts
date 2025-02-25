import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { PassengersService } from './passengers.service';

@ApiBearerAuth()
@Controller('passengers')
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) {}

  @ApiOperation({ summary: 'Create Passenger: Create a new passenger' })
  @Post()
  create(@Body() createPassengerDto: CreatePassengerDto) {
    return this.passengersService.create(createPassengerDto);
  }
}
