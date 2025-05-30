import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { RestaurantService } from '../restaurant.service';

@Injectable()
export class ValidRestaurantIdPipe implements PipeTransform {
  constructor(private restaurantService: RestaurantService) {}
  async transform(value: string) {
    console.log('Validando restaurante ID:', value);
    try {
      await this.restaurantService.getRestaurantById(value);
    } catch (err) {
      throw new BadRequestException("Restaurant ID don't exist");
    }
    return value;
  }
}
