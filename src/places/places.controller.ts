/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('search')
  async search(@Query('query') query: string) {
    return this.placesService.searchPlace(query);
  }
}