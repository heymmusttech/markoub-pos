import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { users } from '../db/schema';

@Injectable()
export class UsersService {
  constructor(@Inject('DATABASE_CONNECTION') private db: MySql2Database) {}

  async findAll() {
    return await this.db.select().from(users).execute();
  }

  async create(data: { name: string; email: string }) {
    return await this.db.insert(users).values(data).execute();
  }

  async findMe(id: number) {
    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    const currentUser = user[0];

    const {password, ...currentUserWithoutPassword} = currentUser;

    return {
      user: currentUserWithoutPassword,
    };
  }
}
