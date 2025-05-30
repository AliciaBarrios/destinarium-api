import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { RestaurantDto } from '../restaurant.dto';
import { RestaurantService } from '../restaurant.service';

@Injectable()
export class ExistRestaurantnNamePipe implements PipeTransform {
  constructor(private restaurantService: RestaurantService) {}
  async transform(value: RestaurantDto) {
    const numName: number =
      await this.restaurantService.restaurantNameAlreadyExist(value);

    if (numName > 0) {
      throw new BadRequestException('Restaurant value already exists');
    }

    return value;
  }
}
