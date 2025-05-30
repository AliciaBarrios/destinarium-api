import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Not, Repository, ILike } from 'typeorm';
import { TransportDto } from './transport.dto';
import { TransportEntity } from './transport.entity';
import { TransportMapper } from './transport.mapper';

export class TransportRepository {
  constructor(
    @InjectRepository(TransportEntity)
    private transportRepository: Repository<TransportEntity>,
    private mapper: TransportMapper,
  ) {}

  getAllTransports(): Promise<TransportEntity[]> {
    return this.transportRepository.find();
  }

  getTransportById(id: string): Promise<TransportEntity> {
    return this.transportRepository.findOne({
      where: { transportId: id },
    });
  }

  getTransportsByCompany(company: string): Promise<TransportEntity[]> {
    return this.transportRepository.find({
      where: {
        company: ILike(`%${company}%`),
      },
    });
  }

  transportCompanyAlreadyExist(transport: TransportDto): Promise<number> {
    return this.transportRepository.count({
      where: {
        company: transport.company,
        transportId: Not(transport.transportId),
      },
    });
  }

  async newTransport(transportDTO: TransportDto): Promise<TransportEntity> {
    const newTransport = await this.mapper.dtoToEntity(transportDTO);
    return this.transportRepository.save(newTransport);
  }

  async updateTransport(
    id: string,
    transportDTO: TransportDto,
  ): Promise<TransportEntity> {
    const updateTransportDTO: TransportDto = new TransportDto(
      id,
      transportDTO.type,
      transportDTO.company,
      transportDTO.address,
      transportDTO.web,
    );
    const updateTransport = await this.mapper.dtoToEntity(updateTransportDTO);
    await this.transportRepository.update(id, updateTransport);
    return this.transportRepository.findOne(id);
  }

  deleteTransport(id: string): Promise<DeleteResult> {
    return this.transportRepository.delete(id);
  }
}
