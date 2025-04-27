/*eslint-disable*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItineraryEntity } from './itinerary.entity';
import { ItinerariesController } from './itineraries.controller';
import { ItinerariesService } from './itineraries.service';
import { ItiinerariesRepository } from './itineraries.repository';
import { ItineraryMapper } from './itinerary.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([ItineraryEntity])],
  controllers: [ItinerariesController],
  providers: [ItinerariesService, ItiinerariesRepository, ItineraryMapper],
  exports: [ItinerariesService],
})
export class ItinerariesModule {}
