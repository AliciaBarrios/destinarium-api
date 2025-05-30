/*eslint-disable*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItineraryEntity } from './itinerary.entity';
import { ItinerariesController } from './itineraries.controller';
import { ItinerariesService } from './itineraries.service';
import { ItiinerariesRepository } from './itineraries.repository';
import { ItineraryMapper } from './itinerary.mapper';
import { ImageService } from 'src/images/image.service';
import { AccommodationModule } from 'src/accommodations/accommodation.module';
import { TransportModule } from 'src/transports/transport.module';
import { RestaurantModule } from 'src/restaurants/restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItineraryEntity]), 
    AccommodationModule,
    TransportModule,
    RestaurantModule
  ],
  controllers: [ItinerariesController],
  providers: [ItinerariesService, ItiinerariesRepository, ItineraryMapper, ImageService],
  exports: [ItinerariesService],
})
export class ItinerariesModule {}
