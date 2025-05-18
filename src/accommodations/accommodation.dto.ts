/*eslint-disable*/
import { ApiProperty } from '@nestjs/swagger';
import { AccommodationType } from './accommodation.entity';

export class AccommodationDto {
    @ApiProperty()
    readonly accommodationId?: string;
  
    @ApiProperty()
    readonly name: string;
  
    @ApiProperty()
    readonly adress: string;
  
    @ApiProperty()
    readonly type: AccommodationType; // Hotel, Airbnb, Camping, etc.

    @ApiProperty()
    readonly price: number;

    @ApiProperty()
    readonly web?: string;
  
    constructor(accommodationId: string, name: string, adress: string, type: AccommodationType, price: number,  web?: string) {
      this.accommodationId = accommodationId;
      this.name = name;
      this.adress = adress;
      this.type = type;
      this.price = price;
      this.web = web;
    }
}