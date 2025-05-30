import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ItinerariesModule } from './itineraries/itineraries.module';
import { UsersModule } from './users/users.module';
import { DayModule } from './days/day.module';
import { AccommodationModule } from './accommodations/accommodation.module';
import { RestaurantModule } from './restaurants/restaurant.module';
import { TransportModule } from './transports/transport.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PlacesService } from './places/places.service';
import { PlacesModule } from './places/places.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    UsersModule,
    CategoriesModule,
    ItinerariesModule,
    AuthModule,
    DayModule,
    AccommodationModule,
    RestaurantModule,
    TransportModule,
    PlacesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PlacesService],
})
export class AppModule {}
