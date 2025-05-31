/*eslint-disable*/
import { AccommodationDto } from 'src/accommodations/accommodation.dto';
import { AccommodationEntity } from 'src/accommodations/accommodation.entity';
import { CategoryDto } from 'src/categories/category.dto';
import { CategoryEntity } from 'src/categories/category.entity';
import { DayDto } from 'src/days/day.dto';
import { DayEntity } from 'src/days/day.entity';
import { RestaurantDto } from 'src/restaurants/restaurant.dto';
import { RestaurantEntity } from 'src/restaurants/restaurant.entity';
import { TransportDto } from 'src/transports/transport.dto';
import { TransportEntity } from 'src/transports/transport.entity';
import { UserEntity } from 'src/users/user.entity';
import { ItineraryDto } from './itinerary.dto';
import { ItineraryEntity } from './itinerary.entity';

export class ItineraryMapper {
  async dtoToEntity(itineraryDTO: ItineraryDto): Promise<ItineraryEntity> {
    const userAssociatedEntity = await UserEntity.findOne(itineraryDTO.userId);
    const categoriesAssociated: CategoryEntity[] = new Array<CategoryEntity>();

    if (itineraryDTO.categories) {
      for (let i = 0; i < itineraryDTO.categories.length; i++) {
        const category = await CategoryEntity.findOne(
          itineraryDTO.categories[i],
        );
        categoriesAssociated.push(category);
      }
    }

    const days = itineraryDTO.days
      ? await DayEntity.findByIds(
          itineraryDTO.days.map((day: DayDto) => day),
        )
      : [];
    const transports = itineraryDTO.transports
      ? await TransportEntity.findByIds(
          itineraryDTO.transports.map(
            (transport: TransportDto) => transport,
          ),
        )
      : [];
    const restaurants = itineraryDTO.restaurants
      ? await RestaurantEntity.findByIds(
          itineraryDTO.restaurants.map(
            (restaurant: RestaurantDto) => restaurant,
          ),
        )
      : [];
    const accommodations = itineraryDTO.accommodations
      ? await AccommodationEntity.findByIds(
          itineraryDTO.accommodations.map(
            (accommodation: AccommodationDto) => accommodation,
          ),
        )
      : [];

    return new ItineraryEntity(
      itineraryDTO.itineraryId,
      itineraryDTO.title,
      itineraryDTO.publicationDate,
      itineraryDTO.duration,
      itineraryDTO.destination,
      itineraryDTO.startDate,
      itineraryDTO.endDate,
      itineraryDTO.rating,
      itineraryDTO.budget,
      itineraryDTO.coverImage,
      userAssociatedEntity,
      days,
      categoriesAssociated,
      transports,
      restaurants,
      accommodations,
    );
  }

  entityToDto(itineraryEntity: ItineraryEntity): ItineraryDto {
    const categories: CategoryDto[] = this.categoryEntityToDto(
      itineraryEntity.categories,
    );
    const days: DayDto[] = this.dayEntityToDto(itineraryEntity.days);
    const transports = this.transportEntityToDto(itineraryEntity.transports);
    const accommodations = this.accommodationEntityToDto(
      itineraryEntity.accommodations,
    );
    const restaurants = this.restaurantEntityToDto(itineraryEntity.restaurants);

    return new ItineraryDto(
      itineraryEntity.itineraryId,
      itineraryEntity.title,
      itineraryEntity.publicationDate,
      itineraryEntity.user.userId,
      itineraryEntity.user.alias,
      itineraryEntity.duration,
      itineraryEntity.destination,
      itineraryEntity.startDate,
      itineraryEntity.endDate,
      itineraryEntity.rating,
      itineraryEntity.budget,
      itineraryEntity.coverImage,
      transports,
      accommodations,
      restaurants,
      categories,
      days,
    );
  }

  private categoryEntityToDto(
    categoriesEntity: CategoryEntity[],
  ): CategoryDto[] {
    return (categoriesEntity ?? []).map(
      (category) =>
        new CategoryDto(
          category.categoryId,
          category.title,
        ),
    );
  }

  private dayEntityToDto(daysEntity: DayEntity[]): DayDto[] {
    return (daysEntity ?? []).map(
      (day) =>
        new DayDto(
          day.dayId,
          day.startLocation,
          day.endLocation,
          day.description,
          day.dayNumber,
        ),
    );
  }

  private transportEntityToDto(
    transportsEntity: TransportEntity[],
  ): TransportDto[] {
    return (transportsEntity ?? []).map(
      (transport) =>
        new TransportDto(
          transport.transportId,
          transport.type,
          transport.company,
          transport.address,
          transport.web,
        ),
    );
  }
  private accommodationEntityToDto(
    accommodationsEntity: AccommodationEntity[],
  ): AccommodationDto[] {
    return (accommodationsEntity ?? []).map(
      (accommodation) =>
        new AccommodationDto(
          accommodation.accommodationId,
          accommodation.name,
          accommodation.address,
          accommodation.type,
          accommodation.price,
          accommodation.web,
        ),
    );
  }
  private restaurantEntityToDto(
    restaurantsEntity: RestaurantEntity[],
  ): RestaurantDto[] {
    return (restaurantsEntity ?? []).map(
      (restaurant) =>
        new RestaurantDto(
          restaurant.restaurantId,
          restaurant.name,
          restaurant.type,
          restaurant.price,
          restaurant.address,
          restaurant.web,
        ),
    );
  }
}
