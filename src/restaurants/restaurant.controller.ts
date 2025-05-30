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
import { ExistRestaurantnNamePipe } from './Pipes/exist-restaurant-name.pipe';
import { ValidRestaurantIdPipe } from './Pipes/valid-restaurant-id.pipe';
import { RestaurantService } from './restaurant.service';
import { RestaurantDto } from './restaurant.dto';

@Controller('restaurants')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get()
  async getAllRestaurants(): Promise<RestaurantDto[]> {
    return await this.restaurantService.getAllRestaurants();
  }

  @Get(':id')
  async getRestaurantById(
    @Param('id', ValidRestaurantIdPipe) id: string,
  ): Promise<RestaurantDto> {
    return await this.restaurantService.getRestaurantById(id);
  }

  @Get('name/:name')
  async getRestaurantsByName(
    @Param('name') name: string,
  ): Promise<RestaurantDto[]> {
    return await this.restaurantService.getRestaurantsByName(name);
  }

  @Post()
  @UsePipes(ExistRestaurantnNamePipe)
  async newRestaurant(
    @Body() restaurant: RestaurantDto,
  ): Promise<RestaurantDto> {
    return await this.restaurantService.newRestaurant(restaurant);
  }

  @Put(':id')
  @UsePipes(ExistRestaurantnNamePipe)
  async updateRestaurant(
    @Param('id', ValidRestaurantIdPipe) id: string,
    @Body() restaurant: RestaurantDto,
  ): Promise<RestaurantDto> {
    return await this.restaurantService.updateRestaurant(id, restaurant);
  }

  @Delete(':id')
  async deleteRestaurant(
    @Param('id', ValidRestaurantIdPipe) id: string,
  ): Promise<DeleteResult> {
    return await this.restaurantService.deleteRestaurant(id);
  }
}
