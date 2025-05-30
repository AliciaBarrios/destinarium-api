import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ExistTransportCompanyPipe } from './Pipes/exist-transport-company.pipe';
import { ValidTransportIdPipe } from './Pipes/valid-transport-id.pipe';
import { TransportDto } from './transport.dto';
import { TransportService } from './transport.service';

@Controller('transports')
export class TransportController {
  constructor(private transportService: TransportService) {}

  @Get()
  async getAllTransports(): Promise<TransportDto[]> {
    return await this.transportService.getAllTransports();
  }

  @Get(':id')
  async getTransportById(
    @Param('id', ValidTransportIdPipe) id: string,
  ): Promise<TransportDto> {
    return await this.transportService.getTransportById(id);
  }

  @Get('company/:company')
  async getTransportsByCompany(
    @Param('company') company: string,
  ): Promise<TransportDto[]> {
    return await this.transportService.getTransportsByCompany(company);
  }

  @Post()
  @UsePipes(ExistTransportCompanyPipe)
  async newTransport(@Body() transport: TransportDto): Promise<TransportDto> {
    return await this.transportService.newTransport(transport);
  }

  @Put(':id')
  @UsePipes(ExistTransportCompanyPipe)
  async updateTransport(
    @Param('id', ValidTransportIdPipe) id: string,
    @Body() transport: TransportDto,
  ): Promise<TransportDto> {
    return await this.transportService.updateTransport(id, transport);
  }

  @Delete(':id')
  async deleteTransport(
    @Param('id', ValidTransportIdPipe) id: string,
  ): Promise<DeleteResult> {
    return await this.transportService.deleteTransport(id);
  }
}
