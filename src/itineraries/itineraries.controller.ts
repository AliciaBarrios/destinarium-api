/*eslint-disable*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { ItineraryDto } from './itinerary.dto';
import { ItinerariesService } from './itineraries.service';
import { ValidItineraryIdPipe } from './pipes/valid-itinerary-id.pipe';
import { ImageService } from 'src/images/image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilterItineraryDto } from './filter-itinerary.dto';

@Controller('itineraries')
export class ItinerariesController {
  constructor(
    private readonly itineraryService: ItinerariesService,
    private readonly imageService: ImageService
  ) {}

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

  @Get('filter')
  getFiltered(@Query() filters: FilterItineraryDto) {
    return this.itineraryService.findWithFilters(filters);
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

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('coverImage', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    }),
  }))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return { fileName: file.filename };
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

  @Post(':id/accommodations')
  async addAccommodations(
    @Param('id') id: string,
    @Body() body: { accommodationIds: string[] },
  ): Promise<ItineraryDto> {
    return this.itineraryService.addAccommodationsToItinerary(id, body.accommodationIds);
  }

  @Post(':id/restaurants')
  async addRestaurants(
    @Param('id') id: string,
    @Body() body: { restaurantIds: string[] },
  ): Promise<ItineraryDto> {
    return this.itineraryService.addRestaurantsToItinerary(id, body.restaurantIds);
  }

  @Post(':id/transports')
  async addTransports(
    @Param('id') id: string,
    @Body() body: { transportIds: string[] },
  ): Promise<ItineraryDto> {
    return this.itineraryService.addTransportsToItinerary(id, body.transportIds);
  }

  @Delete(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async deleteItinerary(
    @Param('id', ValidItineraryIdPipe) id: string,
  ): Promise<DeleteResult> {
    return await this.itineraryService.deleteItinerary(id);
  }
}
