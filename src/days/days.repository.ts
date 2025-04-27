/*eslint-disable*/
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayEntity } from './day.entity';
import { DayDto } from './day.dto';
import { DayMapper } from './day.mapper';

@Injectable()
export class DayRepository {
  constructor(
    @InjectRepository(DayEntity)
    private readonly daysRepository: Repository<DayEntity>,
    private mapper: DayMapper,
  ) {}

  async getDayById(id: string): Promise<DayEntity> {
    return this.daysRepository.findOne(id, {
      relations: ['itinerary', 'transports', 'restaurants', 'accommodations', 'interestPoints'],
    });
  }

  async newDay(dayDTO: DayDto): Promise<DayEntity> { 
    const newDay = await this.mapper.dtoToEntity(dayDTO); 
    return this.daysRepository.save(newDay); 
  }

  async deleteDay(id: string): Promise<void> {
    await this.daysRepository.delete(id);
  }

}
