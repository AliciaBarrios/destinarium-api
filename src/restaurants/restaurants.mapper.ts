/*eslint-disable*/
import { Injectable } from '@nestjs/common';
import { RestaurantDto } from './restaurant.dto';
import { RestaurantEntity } from './restaurant.entity';

@Injectable()
export class RestaurantMapper {
  dtoToEntity(restaurantDto: RestaurantDto): RestaurantEntity {
    return new RestaurantEntity(
      restaurantDto.restaurantId,
      restaurantDto.name,
      restaurantDto.type,
      restaurantDto.price,
      restaurantDto.address,
      restaurantDto.web,
    );
  }

  entityToDto(restaurantEntity: RestaurantEntity): RestaurantDto {
    return new RestaurantDto(
      restaurantEntity.restaurantId,
      restaurantEntity.name,
      restaurantEntity.type,
      restaurantEntity.price,
      restaurantEntity.address,
      restaurantEntity.web,
    );
  }
}




