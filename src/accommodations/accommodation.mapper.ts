import { AccommodationDto } from './accommodation.dto';
import { AccommodationEntity } from './accommodation.entity';

export class AccommodationMapper {
  async dtoToEntity(
    accommodationDTO: AccommodationDto,
  ): Promise<AccommodationEntity> {
    return new AccommodationEntity(
      accommodationDTO.accommodationId,
      accommodationDTO.name,
      accommodationDTO.address,
      accommodationDTO.type,
      accommodationDTO.price,
      accommodationDTO.web,
    );
  }

  entityToDto(accommodationEntity: AccommodationEntity): AccommodationDto {
    return new AccommodationDto(
      accommodationEntity.accommodationId,
      accommodationEntity.name,
      accommodationEntity.address,
      accommodationEntity.type,
      accommodationEntity.price,
      accommodationEntity.web,
    );
  }
}
