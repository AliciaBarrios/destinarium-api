/*eslint-disable*/
import { ApiProperty } from '@nestjs/swagger';

export class RestaurantDto {
    @ApiProperty()
    readonly restaurantId?: string;
  
    @ApiProperty()
    readonly name: string;
  
    @ApiProperty()
    readonly type: string; // Tipo de comida (italiana, japonesa, etc.)

    @ApiProperty()
    readonly price: number;
  
    @ApiProperty()
    readonly location: string;

    @ApiProperty()
    readonly rating: number;

    @ApiProperty()
    readonly web?: string;
  
    constructor(restaurantId: string, name: string, type: string, price: number, location: string, rating: number, web: string) {
      this.restaurantId = restaurantId;
      this.name = name;
      this.type = type;
      this.price = price;
      this.location = location;
      this.rating = rating;
      this.web = web;
    }
  }