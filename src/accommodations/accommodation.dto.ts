/*eslint-disable*/
import { ApiProperty } from '@nestjs/swagger';

export class AccommodationDto {
    @ApiProperty()
    readonly accommodationId?: string;
  
    @ApiProperty()
    readonly name: string;
  
    @ApiProperty()
    readonly location: string;
  
    @ApiProperty()
    readonly type: string; // Hotel, Airbnb, Camping, etc.

    @ApiProperty()
    readonly price: number;

    @ApiProperty()
    readonly rating: number;

    @ApiProperty()
    readonly web?: string;
  
    constructor(accommodationId: string, name: string, location: string, type: string, price: number, rating: number,  web?: string) {
      this.accommodationId = accommodationId;
      this.name = name;
      this.location = location;
      this.type = type;
      this.price = price;
      this.rating = rating;
      this.web = web;
    }
}