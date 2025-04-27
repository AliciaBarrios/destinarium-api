/*eslint-disable*/
import { ApiProperty } from '@nestjs/swagger';

export class TransportDto {
    @ApiProperty()
    readonly transportId?: string;
  
    @ApiProperty()
    readonly type: string; // Avión, Tren, Coche, etc.
  
    @ApiProperty()
    readonly company?: string;

    @ApiProperty()
    readonly price: number;

    @ApiProperty()
    readonly rating: number;
  
    @ApiProperty()
    readonly location?: string;

    @ApiProperty()
    readonly web?: string;
  
    constructor(transportId: string, type: string, price: number, rating: number, company?: string, location?: string, web?: string) {
      this.transportId = transportId;
      this.type = type;
      this.company = company;
      this.rating = rating;
      this.price = price;
      this.location = location;
      this.web = web;
    }
}
  