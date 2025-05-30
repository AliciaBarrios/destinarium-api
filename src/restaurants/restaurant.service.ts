import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { RestaurantDto } from './restaurant.dto';
import { RestaurantEntity } from './restaurant.entity';
import { RestaurantMapper } from './restaurants.mapper';
import { RestaurantRepository } from './restaurant.repository';
@Injectable()
export class RestaurantService {
  constructor(
    private restaurantRepository: RestaurantRepository,
    private mapper: RestaurantMapper,
  ) {}

  async getAllRestaurants(): Promise<RestaurantDto[]> {
    const restaurants: RestaurantEntity[] =
      await this.restaurantRepository.getAllRestaurants();
    return restaurants.map((restaurant) => this.mapper.entityToDto(restaurant));
  }

  async getRestaurantById(id: string): Promise<RestaurantDto> {
    const restaurant: RestaurantEntity =
      await this.restaurantRepository.getRestaurantById(id);
    return this.mapper.entityToDto(restaurant);
  }

  async getRestaurantsByName(name: string): Promise<RestaurantEntity[]> {
    return await this.restaurantRepository.getRestaurantsByName(name);
  }

  async restaurantNameAlreadyExist(restaurant: RestaurantDto): Promise<number> {
    return await this.restaurantRepository.restaurantNameAlreadyExist(
      restaurant,
    );
  }

  async newRestaurant(restaurantDTO: RestaurantDto): Promise<RestaurantDto> {
    const newRestaurant: RestaurantEntity =
      await this.restaurantRepository.newRestaurant(restaurantDTO);
    return this.mapper.entityToDto(newRestaurant);
  }

  async updateRestaurant(
    id: string,
    restaurantDTO: RestaurantDto,
  ): Promise<RestaurantDto> {
    const updateCategory = await this.restaurantRepository.updateRestaurant(
      id,
      restaurantDTO,
    );
    return this.mapper.entityToDto(updateCategory);
  }

  async deleteRestaurant(id: string): Promise<DeleteResult> {
    const deleteResult: DeleteResult =
      await this.restaurantRepository.deleteRestaurant(id);
    return deleteResult;
  }
}
