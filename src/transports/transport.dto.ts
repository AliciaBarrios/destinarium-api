/*eslint-disable*/
import { ApiProperty } from '@nestjs/swagger';
import { TransportType } from './transport.entity';

export class TransportDto {
    @ApiProperty()
    readonly transportId?: string;
  
    @ApiProperty()
    readonly type: TransportType; // Avión, Tren, Coche, etc.
  
    @ApiProperty()
    readonly company?: string;
  
    @ApiProperty()
    readonly address?: string;

    @ApiProperty()
    readonly web?: string;

    @ApiProperty({ example: 'transporte', description: 'Tipo fijo del servicio' })
    readonly serviceType: string = 'transporte';
  
    constructor(transportId: string, type: TransportType, company?: string, address?: string, web?: string) {
      this.transportId = transportId;
      this.type = type;
      this.company = company;
      this.address = address;
      this.web = web;
      this.serviceType = 'transporte'; 
    }
}
  