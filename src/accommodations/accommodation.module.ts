import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationEntity } from './accommodation.entity';
import { AccommodationMapper } from './accommodation.mapper';
import { AccommodationRepository } from './accommodation.repository';
import { AccommodationService } from './accommodation.service';
import { AccommodationController } from './accommodation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccommodationEntity])],
  controllers: [AccommodationController],
  providers: [
    AccommodationMapper,
    AccommodationRepository,
    AccommodationService,
  ],
  exports: [AccommodationService, TypeOrmModule],
})
export class AccommodationModule {}
