import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { DatabaseModule } from './config/database.module';
import { PassengersModule } from './passengers/passengers.module';
import { TicketsModule } from './tickets/tickets.module';
import { TripsModule } from './trips/trips.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
    }),
    PassengersModule,
    TicketsModule,
    TripsModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: DataResponseInterceptor,
    // },
    AccessTokenGuard,
  ],
})
export class AppModule {}