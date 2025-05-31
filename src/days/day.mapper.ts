/*eslint-disable*/
import { DayDto } from './day.dto';
import { DayEntity } from './day.entity';

export class DayMapper {
  async dtoToEntity(dayDTO: DayDto): Promise<DayEntity> {
    const dayEntity = new DayEntity(
      dayDTO.dayId,
      dayDTO.startLocation,
      dayDTO.endLocation,
      dayDTO.description,
      dayDTO.dayNumber,
    );

    if (dayDTO.itineraryId) {
      dayEntity.itineraryId = dayDTO.itineraryId;
    }

    return dayEntity;
  }

  entityToDto(entity: DayEntity): DayDto {
    return new DayDto(
      entity.dayId,
      entity.startLocation,
      entity.endLocation,
      entity.description,
      entity.dayNumber,
    );
  }
}
