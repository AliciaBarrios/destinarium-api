/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('search')
  async search(@Query('query') query: string) {
    return this.placesService.searchPlaces(query);
  }

  @Get('coordinates')
  async getCoordinates(@Query('place') place: string) {
    return this.placesService.getCoordinates(place);
  }

  @Get('api-url')
  getMapsApiUrl() {
    return this.placesService.getGoogleMapsApiUrl();
  }
}