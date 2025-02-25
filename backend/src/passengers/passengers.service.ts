import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { passengers } from '../db/schema';
import { CreatePassengerDto } from './dto/create-passenger.dto';

@Injectable()
export class PassengersService {
  constructor(@Inject('DATABASE_CONNECTION') private db: MySql2Database) {}

  async create(createPassengerDto: CreatePassengerDto) {
    const [result] = await this.db.insert(passengers).values(createPassengerDto).execute();

    const createdPassenger = await this.db
      .select()
      .from(passengers)
      .where(eq(passengers.id, result.insertId))
      .execute();

    return createdPassenger[0];
  }
}