import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Not, Repository, ILike } from 'typeorm';
import { RestaurantDto } from './restaurant.dto';
import { RestaurantEntity } from './restaurant.entity';
import { RestaurantMapper } from './restaurants.mapper';

export class RestaurantRepository {
  constructor(
    @InjectRepository(RestaurantEntity)
    private restaurantRepository: Repository<RestaurantEntity>,
    private mapper: RestaurantMapper,
  ) {}

  getAllRestaurants(): Promise<RestaurantEntity[]> {
    return this.restaurantRepository.find();
  }

  getRestaurantById(id: string): Promise<RestaurantEntity> {
    return this.restaurantRepository.findOne({
      where: { restaurantId: id },
    });
  }

  getRestaurantsByName(name: string): Promise<RestaurantEntity[]> {
    return this.restaurantRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
    });
  }

  restaurantNameAlreadyExist(restaurant: RestaurantDto): Promise<number> {
    return this.restaurantRepository.count({
      where: {
        name: restaurant.name,
        restaurantId: Not(restaurant.restaurantId),
      },
    });
  }

  async newRestaurant(restaurantDTO: RestaurantDto): Promise<RestaurantEntity> {
    const newRestaurant = await this.mapper.dtoToEntity(restaurantDTO);
    return this.restaurantRepository.save(newRestaurant);
  }

  async updateRestaurant(
    id: string,
    restaurantDTO: RestaurantDto,
  ): Promise<RestaurantEntity> {
    const updateRestaurantDTO: RestaurantDto = new RestaurantDto(
      id,
      restaurantDTO.name,
      restaurantDTO.type,
      restaurantDTO.price,
      restaurantDTO.address,
      restaurantDTO.web,
    );
    const updateRestaurant = await this.mapper.dtoToEntity(updateRestaurantDTO);
    await this.restaurantRepository.update(id, updateRestaurant);
    return this.restaurantRepository.findOne(id);
  }

  deleteRestaurant(id: string): Promise<DeleteResult> {
    return this.restaurantRepository.delete(id);
  }
}
