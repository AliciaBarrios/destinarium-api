/*eslint-disable*/
import { Injectable } from '@nestjs/common';
import { TransportDto } from './transport.dto';
import { TransportEntity } from './transport.entity';

@Injectable()
export class TransportMapper {
  dtoToEntity(transporttDto: TransportDto): TransportEntity {
    return new TransportEntity(
      transporttDto.transportId,
      transporttDto.type,
      transporttDto.company,
      transporttDto.address,
      transporttDto.web,
    );
  }

  entityToDto(transportEntity: TransportEntity): TransportDto {
    return new TransportDto(
      transportEntity.transportId,
      transportEntity.type,
      transportEntity.company,
      transportEntity.address,
      transportEntity.web,
    );
  }
}




