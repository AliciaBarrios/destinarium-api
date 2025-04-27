/*eslint-disable*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { ItineraryDto } from './itinerary.dto';
import { ItinerariesService } from './itineraries.service';
import { ValidItineraryIdPipe } from './pipes/valid-itinerary-id.pipe';

@Controller('itineraries')
export class ItinerariesController {
  constructor(private readonly itineraryService: ItinerariesService) {}

  @Get()
  async getAllItineraries(): Promise<ItineraryDto[]> {
    return await this.itineraryService.getAllItineraries();
  }

  @Get('category/:categoryId')
  async getItinerariesByCategory(
    @Param('categoryId') categoryId: string
  ): Promise<ItineraryDto[]> {
    return await this.itineraryService.findByCategory(categoryId);
  }

  @Get('destination/:destination')
  async getItinerariesByDestination(
    @Param('destination') destination: string
  ): Promise<ItineraryDto[]> {
    return await this.itineraryService.findByDestination(destination);
  }

  @Get('rating/:rating')
  async getItinerariesByRating(
    @Param('rating') rating: number
  ): Promise<ItineraryDto[]> {
    return await this.itineraryService.findByRating(Number(rating));
  }

  @Get(':id')
  @ApiBearerAuth('access_token')
  async getItineraryById(
    @Param('id', ValidItineraryIdPipe) id: string,
  ): Promise<ItineraryDto> {
    return await this.itineraryService.getItineraryById(id);
  }

  @Post()
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async newItinerary(@Body() itinerary: ItineraryDto): Promise<ItineraryDto> {
    return await this.itineraryService.newItinerary(itinerary);
  }

  @Put(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async updateItinerary(
    @Param('id', ValidItineraryIdPipe) id: string,
    @Body() itinerary: ItineraryDto,
  ): Promise<ItineraryDto> {
    return await this.itineraryService.updateItinerary(id, itinerary);
  }

  @Delete(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async deletePost(
    @Param('id', ValidItineraryIdPipe) id: string,
  ): Promise<DeleteResult> {
    return await this.itineraryService.deleteItinerary(id);
  }
}
