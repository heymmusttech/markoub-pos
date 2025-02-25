import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        try {
          const connection = await mysql.createConnection({
            host: String(process.env.DB_HOST),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: parseInt(process.env.DB_PORT || '3306'),
          });

          // Test the connection
          await connection.connect();
          console.log('Database connection established');

          return drizzle(connection);
        } catch (error) {
          console.error('Database connection failed:', error);
          throw error;
        }
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}