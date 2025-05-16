/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DaysController } from './day.controller';
import { DayRepository } from './days.repository';
import { DayService } from './day.service';
import { DayEntity } from './day.entity';
import { DayMapper } from './day.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([DayEntity])],
  controllers: [DaysController],
  providers: [DayMapper, DayRepository, DayService],
  exports: [DayService],
})
export class DayModule {}