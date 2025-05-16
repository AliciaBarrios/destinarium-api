/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { DayService } from './day.service';
import { DayDto } from './day.dto';

@Controller('days')
export class DaysController {
  constructor(private dayService: DayService) {}

  @Get()
  async getAllDays(): Promise<DayDto[]> {
    return await this.dayService.getAllDays();
  }

  @Get(':id')
  async getDayById(@Param('id') id: string): Promise<DayDto> {
    return await this.dayService.getDayById(id);
  }

  @Get('by-itinerary/:itineraryId')
  async getDaysByItineraryId(@Param('itineraryId') itineraryId: string): Promise<DayDto[]> {
    return await this.dayService.getDaysByItineraryId(itineraryId);
  }

  @Post()
  async newDays(@Body() days: DayDto[]): Promise<DayDto[]> {
    return await this.dayService.newDays(days);
  }

  @Put(':id')
  async updateDay(
    @Param('id') id: string,
    @Body() day: DayDto,
  ): Promise<DayDto> {
    return await this.dayService.updateDay(id, day);
  }

  @Delete(':id')
  async deleteDay(@Param('id') id: string): Promise<DeleteResult> {
    return await this.dayService.deleteDay(id);
  }
}
