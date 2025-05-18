import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { AccommodationDto } from './accommodation.dto';
import { AccommodationEntity } from './accommodation.entity';
import { AccommodationMapper } from './accommodation.mapper';
import { AccommodationRepository } from './accommodation.repository';
@Injectable()
export class AccommodationService {
  constructor(
    private accommodationRepository: AccommodationRepository,
    private mapper: AccommodationMapper,
  ) {}

  async getAllAccommodations(): Promise<AccommodationDto[]> {
    const accommodations: AccommodationEntity[] =
      await this.accommodationRepository.getAllAccommodations();
    return accommodations.map((accommodation) =>
      this.mapper.entityToDto(accommodation),
    );
  }

  async getAccommodationById(id: string): Promise<AccommodationDto> {
    const accommodation: AccommodationEntity =
      await this.accommodationRepository.getAccommodationById(id);
    return this.mapper.entityToDto(accommodation);
  }

  async getAccommodationByName(name: string): Promise<AccommodationEntity> {
    return await this.accommodationRepository.getAccommodationByName(name);
  }

  async accommodationNameAlreadyExist(
    accomodation: AccommodationDto,
  ): Promise<number> {
    return await this.accommodationRepository.accommodationNameAlreadyExist(
      accomodation,
    );
  }

  async newAccommodation(
    accommodationDTO: AccommodationDto,
  ): Promise<AccommodationDto> {
    const newAccommodation: AccommodationEntity =
      await this.accommodationRepository.newAccommodation(accommodationDTO);
    return this.mapper.entityToDto(newAccommodation);
  }

  async updateAccommodation(
    id: string,
    accommodationDTO: AccommodationDto,
  ): Promise<AccommodationDto> {
    const updateCategory =
      await this.accommodationRepository.updateAccommodation(
        id,
        accommodationDTO,
      );
    return this.mapper.entityToDto(updateCategory);
  }

  async deleteAccommodation(id: string): Promise<DeleteResult> {
    const deleteResult: DeleteResult =
      await this.accommodationRepository.deleteAccommodation(id);
    return deleteResult;
  }
}
