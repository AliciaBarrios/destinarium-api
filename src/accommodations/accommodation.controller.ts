import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { AccommodationService } from './accommodation.service';
import { AccommodationDto } from './accommodation.dto';
import { ExistAccomodationNamePipe } from './Pipes/exist-accommodation-name.pipe';
import { ValidAccommodationIdPipe } from './Pipes/valid-accommodation-id.pipe';

@Controller('accommodations')
export class AccommodationController {
  constructor(private accommodationService: AccommodationService) {}

  @Get()
  async getAllAccommodations(): Promise<AccommodationDto[]> {
    return await this.accommodationService.getAllAccommodations();
  }

  @Get(':id')
  async getAccommodationById(
    @Param('id', ValidAccommodationIdPipe) id: string,
  ): Promise<AccommodationDto> {
    return await this.accommodationService.getAccommodationById(id);
  }

  @Get('name/:name')
  async getAccommodationByName(
    @Param('name') name: string,
  ): Promise<AccommodationDto> {
    return await this.accommodationService.getAccommodationByName(name);
  }

  @Post()
  @UsePipes(ExistAccomodationNamePipe)
  async newAccommodation(
    @Body() accommodation: AccommodationDto,
  ): Promise<AccommodationDto> {
    return await this.accommodationService.newAccommodation(accommodation);
  }

  @Put(':id')
  @UsePipes(ExistAccomodationNamePipe)
  async updateAccommodation(
    @Param('id', ValidAccommodationIdPipe) id: string,
    @Body() accommodation: AccommodationDto,
  ): Promise<AccommodationDto> {
    return await this.accommodationService.updateAccommodation(
      id,
      accommodation,
    );
  }

  @Delete(':id')
  async deleteAccommodation(
    @Param('id', ValidAccommodationIdPipe) id: string,
  ): Promise<DeleteResult> {
    return await this.accommodationService.deleteAccommodation(id);
  }
}
