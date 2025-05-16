/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { DayRepository } from './days.repository';
import { DayDto } from './day.dto';
import { DayEntity } from './day.entity';
import { DayMapper } from './day.mapper';

@Injectable()
export class DayService {
  constructor(
    private daysRepository: DayRepository,
    private mapper: DayMapper,
  ) {}

  async getAllDays(): Promise<DayDto[]> {
    const days: DayEntity[] = await this.daysRepository.getAllDays();
    return days.map((day) => this.mapper.entityToDto(day));
  }

  async getDayById(id: string): Promise<DayDto> {
    const day: DayEntity = await this.daysRepository.getDayById(id);
    return this.mapper.entityToDto(day);
  }

  async getDaysByItineraryId(itineraryId: string): Promise<DayDto[]> {
    const days: DayEntity[] = await this.daysRepository.getDaysByItineraryId(itineraryId);
    return days.map((day) => this.mapper.entityToDto(day));
  }

  async newDays(daysDTO: DayDto[]): Promise<DayDto[]> {
    const newDaysEntities: DayEntity[] = await this.daysRepository.newDays(daysDTO);
    return newDaysEntities.map(dayEntity => this.mapper.entityToDto(dayEntity));
  }

  async updateDay(id: string, dayDTO: DayDto): Promise<DayDto> {
    const updateDay = await this.daysRepository.updateDay(id, dayDTO);
    return this.mapper.entityToDto(updateDay);
  }

  async deleteDay(id: string): Promise<DeleteResult> {
    const deleteResult: DeleteResult = await this.daysRepository.deleteDay(id);
    return deleteResult;
  }
}
