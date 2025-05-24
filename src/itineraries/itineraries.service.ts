/*eslint-disable*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ItineraryDto } from './itinerary.dto';
import { ItiinerariesRepository } from './itineraries.repository';
import { ItineraryEntity } from './itinerary.entity';
import { ItineraryMapper } from './itinerary.mapper';

@Injectable()
export class ItinerariesService {
  constructor(
    private itinerariesRepository: ItiinerariesRepository,
    private mapper: ItineraryMapper,
  ) {}
  async getAllItineraries(): Promise<ItineraryDto[]> {
    const itineraries: ItineraryEntity[] =
      await this.itinerariesRepository.getAllItineraries();
    return itineraries.map((itinerary) => this.mapper.entityToDto(itinerary));
  }

  async getItineraryById(id: string): Promise<ItineraryDto> {
    const itinerary: ItineraryEntity =
      await this.itinerariesRepository.getItineraryById(id);
    return this.mapper.entityToDto(itinerary);
  }

  async findByCategory(categoryId: string): Promise<ItineraryDto[]> {
    const itineraries: ItineraryEntity[] =
      await this.itinerariesRepository.getItinerariesByCategory(categoryId);
    return itineraries.map((itinerary) => this.mapper.entityToDto(itinerary));
  }
  async findByDestination(
    destination: string,
  ): Promise<ItineraryDto[]> {
    const itineraries: ItineraryEntity[] =
      await this.itinerariesRepository.getItinerariesByDestination(destination);
    return itineraries.map((itinerary) => this.mapper.entityToDto(itinerary));
  }

  async findByRating(rating: number): Promise<ItineraryDto[]> {
    const itineraries: ItineraryEntity[] =
      await this.itinerariesRepository.getItinerariesByRating(rating);
    return itineraries.map((itinerary) => this.mapper.entityToDto(itinerary));
  }

  async findByDuration(
    durationType: 'short' | 'medium' | 'long' | 'extended' | 'very_long',
  ): Promise<ItineraryDto[]> {
    const itineraries: ItineraryEntity[] =
      await this.itinerariesRepository.getItinerariesByDuration(durationType);
    return itineraries.map((itinerary) => this.mapper.entityToDto(itinerary));
  }

  async newItinerary(itineraryDTO: ItineraryDto): Promise<ItineraryDto> {
    const newItinerary: ItineraryEntity =
      await this.itinerariesRepository.newItinerary(itineraryDTO);
    return this.mapper.entityToDto(newItinerary);
  }

  async updateItinerary(
    id: string,
    itineraryDTO: ItineraryDto,
  ): Promise<ItineraryDto> {
    const updateItinerary = await this.itinerariesRepository.updateItinerary(
      id,
      itineraryDTO,
    );
    return this.mapper.entityToDto(updateItinerary);
  }

  async addAccommodationsToItinerary(itineraryId: string, accommodationIds: string[]): Promise<ItineraryDto> {
    const updatedItinerary = await this.itinerariesRepository.addAccommodationsToItinerary(itineraryId, accommodationIds);
    return this.mapper.entityToDto(updatedItinerary);
  }

  async deleteItinerary(id: string): Promise<DeleteResult> {
    const deleteResult: DeleteResult =
      await this.itinerariesRepository.deleteItinerary(id);
    return deleteResult;
  }
}
