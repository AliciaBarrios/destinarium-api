import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { TransportDto } from './transport.dto';
import { TransportEntity } from './transport.entity';
import { TransportMapper } from './transport.mapper';
import { TransportRepository } from './transport.repository';
@Injectable()
export class TransportService {
  constructor(
    private transportRepository: TransportRepository,
    private mapper: TransportMapper,
  ) {}

  async getAllTransports(): Promise<TransportDto[]> {
    const transports: TransportEntity[] =
      await this.transportRepository.getAllTransports();
    return transports.map((transport) => this.mapper.entityToDto(transport));
  }

  async getTransportById(id: string): Promise<TransportDto> {
    const transport: TransportEntity =
      await this.transportRepository.getTransportById(id);
    return this.mapper.entityToDto(transport);
  }

  async getTransportsByCompany(company: string): Promise<TransportEntity[]> {
    return await this.transportRepository.getTransportsByCompany(company);
  }

  async transportCompanyAlreadyExist(transport: TransportDto): Promise<number> {
    return await this.transportRepository.transportCompanyAlreadyExist(
      transport,
    );
  }

  async newTransport(transportDTO: TransportDto): Promise<TransportDto> {
    const newTransport: TransportEntity =
      await this.transportRepository.newTransport(transportDTO);
    return this.mapper.entityToDto(newTransport);
  }

  async updateTransport(
    id: string,
    transportDTO: TransportDto,
  ): Promise<TransportDto> {
    const updateCategory = await this.transportRepository.updateTransport(
      id,
      transportDTO,
    );
    return this.mapper.entityToDto(updateCategory);
  }

  async deleteTransport(id: string): Promise<DeleteResult> {
    const deleteResult: DeleteResult =
      await this.transportRepository.deleteTransport(id);
    return deleteResult;
  }
}
