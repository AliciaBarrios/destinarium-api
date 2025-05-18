import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Not, Repository } from 'typeorm';
import { AccommodationDto } from './accommodation.dto';
import { AccommodationEntity } from './accommodation.entity';
import { AccommodationMapper } from './accommodation.mapper';

export class AccommodationRepository {
  constructor(
    @InjectRepository(AccommodationEntity)
    private accommodationRepository: Repository<AccommodationEntity>,
    private mapper: AccommodationMapper,
  ) {}

  getAllAccommodations(): Promise<AccommodationEntity[]> {
    return this.accommodationRepository.find();
  }

  getAccommodationById(id: string): Promise<AccommodationEntity> {
    return this.accommodationRepository.findOne({
      where: { accommodationId: id },
    });
  }

  getAccommodationByName(name: string): Promise<AccommodationEntity> {
    return this.accommodationRepository.findOne({ name });
  }

  accommodationNameAlreadyExist(
    accommodation: AccommodationDto,
  ): Promise<number> {
    return this.accommodationRepository.count({
      where: {
        name: accommodation.name,
        accommodationId: Not(accommodation.accommodationId),
      },
    });
  }

  async newAccommodation(
    accommodationDTO: AccommodationDto,
  ): Promise<AccommodationEntity> {
    const newAccommodation = await this.mapper.dtoToEntity(accommodationDTO);
    return this.accommodationRepository.save(newAccommodation);
  }

  async updateAccommodation(
    id: string,
    accommodationDTO: AccommodationDto,
  ): Promise<AccommodationEntity> {
    const updateAccommodationDTO: AccommodationDto = new AccommodationDto(
      id,
      accommodationDTO.name,
      accommodationDTO.adress,
      accommodationDTO.type,
      accommodationDTO.price,
      accommodationDTO.web,
    );
    const updateAccommodation = await this.mapper.dtoToEntity(
      updateAccommodationDTO,
    );
    await this.accommodationRepository.update(id, updateAccommodation);
    return this.accommodationRepository.findOne(id);
  }

  deleteAccommodation(id: string): Promise<DeleteResult> {
    return this.accommodationRepository.delete(id);
  }
}
