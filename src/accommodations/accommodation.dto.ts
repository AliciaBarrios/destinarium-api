/*eslint-disable*/
import { ApiProperty } from '@nestjs/swagger';
import { AccommodationType } from './accommodation.entity';

export class AccommodationDto {
    @ApiProperty()
    readonly accommodationId?: string;
  
    @ApiProperty()
    readonly name: string;
  
    @ApiProperty()
    readonly address: string;
  
    @ApiProperty()
    readonly type: AccommodationType; // Hotel, Airbnb, Camping, etc.

    @ApiProperty()
    readonly price: number;

    @ApiProperty()
    readonly web?: string;

    @ApiProperty({ example: 'alojamiento', description: 'Tipo fijo del servicio' })
    readonly serviceType: string = 'alojamiento';
  
    constructor(accommodationId: string, name: string, address: string, type: AccommodationType, price: number,  web?: string) {
      this.accommodationId = accommodationId;
      this.name = name;
      this.address = address;
      this.type = type;
      this.price = price;
      this.web = web;
      this.serviceType = 'alojamiento'; 
    }
}