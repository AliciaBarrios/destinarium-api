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
    readonly address: string;

    @ApiProperty()
    readonly web?: string;

    @ApiProperty({ example: 'restaurante', description: 'Tipo fijo del servicio' })
    readonly serviceType: string = 'restaurante';
  
    constructor(restaurantId: string, name: string, type: string, price: number, address: string, web: string) {
      this.restaurantId = restaurantId;
      this.name = name;
      this.type = type;
      this.price = price;
      this.address = address;
      this.web = web;
      this.serviceType = 'restaurante'; 
    }
  }