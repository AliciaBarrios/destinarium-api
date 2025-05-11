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
  @UseInterceptors(FileInterceptor('coverImage')) // new
  async newItinerary(
    @Body() itinerary: ItineraryDto,
    @UploadedFile() file?: Express.Multer.File, // new
  ): Promise<ItineraryDto> {
    let imageFileName: string | undefined;

    // Si se ha subido una imagen, se procesa y se guarda
    if (file) {
      imageFileName = await this.imageService.processAndSaveImage(file);
    }

    // Creamos el DTO final con la imagen procesada (si existe)
    const itineraryDto: ItineraryDto = {
      ...itinerary,
      coverImage: imageFileName, // Añadimos el nombre de la imagen procesada
    };


    return await this.itineraryService.newItinerary(itineraryDto);
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
