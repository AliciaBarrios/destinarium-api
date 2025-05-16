/*eslint-disable*/
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
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

  async getAllDays(): Promise<DayEntity[]> {
    return await this.daysRepository.find({
      relations: ['itinerary'],
    });
  }

  async getDayById(id: string): Promise<DayEntity> {
    return this.daysRepository.findOne(id, {
      relations: ['itinerary'],
    });
  }

  async newDay(dayDTO: DayDto): Promise<DayEntity> { 
    const newDay = await this.mapper.dtoToEntity(dayDTO); 
    return this.daysRepository.save(newDay); 
  }

  async updateDay(id: string, dayDTO: DayDto): Promise<DayEntity> {
    const existingDay = await this.daysRepository.findOne(id);
    if (!existingDay) {
      throw new Error('Día no encontrado');
    }

    const updatedDay = this.daysRepository.merge(existingDay, await this.mapper.dtoToEntity(dayDTO));
    return await this.daysRepository.save(updatedDay);
  }

  deleteDay(id: string): Promise<DeleteResult> {
    return this.daysRepository.delete(id);
  }
}
