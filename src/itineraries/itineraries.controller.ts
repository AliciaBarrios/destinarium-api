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
  UploadedFile
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

  @Delete(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async deletePost(
    @Param('id', ValidItineraryIdPipe) id: string,
  ): Promise<DeleteResult> {
    return await this.itineraryService.deleteItinerary(id);
  }
}
