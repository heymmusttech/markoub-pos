import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateTripDto } from './dto/create-trip.dto';
import { SearchTripDto } from './dto/search-trip.dto';
import { TripsService } from './trips.service';


@ApiBearerAuth()
@Controller('trips')
export class TripsController {
    constructor(private readonly tripsService: TripsService) {}

    @ApiOperation({ summary: 'Get All Trips: Get all trips' })
    @Get()
    getAll() {
      return this.tripsService.getAll();
    }

    @ApiOperation({ summary: 'Create Trip: Create a new trip' })
    @Post()
    create(@Body() createTripDto: CreateTripDto) {
      return this.tripsService.create(createTripDto);
    }
  
    @ApiOperation({ summary: 'Search Trip: Search for a trip' })
    @Get("search")
    search(@Query() searchTripDto: SearchTripDto) {
      return this.tripsService.search(searchTripDto);
    }

    @ApiOperation({ summary: 'Get all booked seats on a trip' })
    @Get('/:tripId/booked-seats')
    async getBookedSeats(@Param('tripId') tripId: number) {
      return this.tripsService.getBookedSeats(tripId);
    }
}
