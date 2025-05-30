/*eslint-disable*/
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getConnection, Repository, In } from 'typeorm';
import { ItineraryDto } from './itinerary.dto';
import { ItineraryEntity } from './itinerary.entity';
import { ItineraryMapper } from './itinerary.mapper';
import { AccommodationEntity } from 'src/accommodations/accommodation.entity';
import { TransportEntity } from 'src/transports/transport.entity';
import { RestaurantEntity } from 'src/restaurants/restaurant.entity';
import { FilterItineraryDto } from './filter-itinerary.dto';

export class ItiinerariesRepository {
  constructor(
    @InjectRepository(ItineraryEntity)
    private itinerariesRepository: Repository<ItineraryEntity>,
    @InjectRepository(RestaurantEntity)
    private restaurantRepository: Repository<RestaurantEntity>,
    @InjectRepository(TransportEntity)
    private transportRepository: Repository<TransportEntity>,
    @InjectRepository(AccommodationEntity)
    private accommodationRepository: Repository<AccommodationEntity>,
    private mapper: ItineraryMapper,
  ) {}

  getAllItineraries(): Promise<ItineraryEntity[]> {
    return this.itinerariesRepository.find({
      relations: [
        'user',
        'categories',
        'days',
        'accommodations',
        'transports',
        'restaurants',
      ],
    });
  }

  getItineraryById(id: string): Promise<ItineraryEntity> {
    return this.itinerariesRepository.findOne(id, {
      relations: [
        'user',
        'categories',
        'days',
        'accommodations',
        'transports',
        'restaurants',
      ],
    });
  }

  getItinerariesByCategory(categoryId: string): Promise<ItineraryEntity[]> {
    return this.itinerariesRepository
      .createQueryBuilder('itinerary')
      .innerJoin(
        'itinerary.categories',
        'category',
        'category.categoryId = :categoryId',
        {
          categoryId,
        },
      )
      .leftJoinAndSelect('itinerary.user', 'user')
      .getMany();
  }

  async getItinerariesWithFilters(filters: FilterItineraryDto): Promise<ItineraryEntity[]> {
    const query = this.itinerariesRepository
      .createQueryBuilder('itinerary')
      .leftJoinAndSelect('itinerary.user', 'user')
      .leftJoinAndSelect('itinerary.categories', 'category')
      .leftJoinAndSelect('itinerary.days', 'days');

    if (filters.destination) {
      query.andWhere('LOWER(itinerary.destination) LIKE LOWER(:destination)', {
        destination: `%${filters.destination}%`,
      });
    }

    if (filters.minRating !== undefined) {
      query.andWhere('itinerary.rating >= :minRating', { minRating: filters.minRating });
    }

    if (filters.maxRating !== undefined) {
      query.andWhere('itinerary.rating <= :maxRating', { maxRating: filters.maxRating });
    }

    if (filters.minDuration !== undefined) {
      query.andWhere('itinerary.num_days >= :minDuration', { minDuration: filters.minDuration });
    }

    if (filters.maxDuration !== undefined) {
      query.andWhere('itinerary.num_days <= :maxDuration', { maxDuration: filters.maxDuration });
    }

    if (filters.categories && filters.categories.length > 0) {
      query.andWhere('category.title IN (:...categories)', {
        categories: filters.categories,
      });
    }

    return query.getMany();
  }

  async newItinerary(itineraryDto: ItineraryDto): Promise<ItineraryEntity> {
    const newItinerary = await this.mapper.dtoToEntity(itineraryDto);

    return this.itinerariesRepository.save(newItinerary);
  }

  async updateItinerary(
    id: string,
    itineraryDto: ItineraryDto,
  ): Promise<ItineraryEntity> {
    const updateItineraryDto: ItineraryDto = new ItineraryDto(
      id,
      itineraryDto.title,
      itineraryDto.publicationDate,
      itineraryDto.userId,
      itineraryDto.userAlias,
      itineraryDto.duration,
      itineraryDto.destination,
      itineraryDto.startDate,
      itineraryDto.endDate,
      itineraryDto.rating,
      itineraryDto.budget,
      itineraryDto.coverImage,
      itineraryDto.transports,
      itineraryDto.accommodations,
      itineraryDto.restaurants,
      itineraryDto.categories,
      itineraryDto.days,
    );
    const updateItinerary = await this.mapper.dtoToEntity(updateItineraryDto);
   
    await getConnection()
      .createQueryBuilder()
      .update('itineraries_categories_categories')
      .delete()
      .where('itinerariesItineraryId = :itinerariesItineraryId', { itinerariesItineraryId: id })
      .execute();

    return await this.itinerariesRepository.save(updateItinerary);
  }

  async addAccommodationsToItinerary(itineraryId: string, accommodationIds: string[]): Promise<ItineraryEntity> {
    const itinerary = await this.itinerariesRepository.findOne({
      where: { itineraryId },
      relations: [
        'user',
        'categories',
        'days',
        'accommodations',
        'transports',
        'restaurants',
      ],
    });

    if (!itinerary) {
      throw new Error('Itinerary not found');
    }

    const accommodations = await this.accommodationRepository.find({
      accommodationId: In(accommodationIds),
    });

    // Evitar duplicados: combinar alojamientos ya existentes con los nuevos
    const existingIds = itinerary.accommodations?.map(accommodation => accommodation.accommodationId) || [];
    const newAccommodations = accommodations.filter(accommodation => !existingIds.includes(accommodation.accommodationId));

    itinerary.accommodations = [...(itinerary.accommodations || []), ...newAccommodations];

    return await this.itinerariesRepository.save(itinerary);
  }

   async addRestaurantsToItinerary(itineraryId: string, restaurantIds: string[]): Promise<ItineraryEntity> {
    const itinerary = await this.itinerariesRepository.findOne({
      where: { itineraryId },
      relations: [
        'user',
        'categories',
        'days',
        'accommodations',
        'transports',
        'restaurants',
      ],
    });

    if (!itinerary) {
      throw new Error('Itinerary not found');
    }

    const restaurants = await this.restaurantRepository.find({
      where: { restaurantId: In(restaurantIds) },
    });

    // Evitar duplicados: combinar restaurantes ya existentes con los nuevos
    const existingIds = itinerary.restaurants?.map(restaurant => restaurant.restaurantId) || [];
    const newRestaurants = restaurants.filter(restaurant => !existingIds.includes(restaurant.restaurantId));

    itinerary.restaurants = [...(itinerary.restaurants || []), ...newRestaurants];

    return await this.itinerariesRepository.save(itinerary);
  }

   async addTransportsToItinerary(itineraryId: string, transportIds: string[]): Promise<ItineraryEntity> {
    const itinerary = await this.itinerariesRepository.findOne({
      where: { itineraryId },
      relations: [
        'user',
        'categories',
        'days',
        'accommodations',
        'transports',
        'restaurants',
      ],
    });

    if (!itinerary) {
      throw new Error('Itinerary not found');
    }

    const transports = await this.transportRepository.find({
      where: { transportId: In(transportIds) },
    });

    // Evitar duplicados: combinar transportes ya existentes con los nuevos
    const existingIds = itinerary.transports?.map(transport => transport.transportId) || [];
    const newTransports = transports.filter(transport => !existingIds.includes(transport.transportId));

    itinerary.transports = [...(itinerary.transports || []), ...newTransports];

    return await this.itinerariesRepository.save(itinerary);
  }

  deleteItinerary(id: string): Promise<DeleteResult> {
    return this.itinerariesRepository.delete(id);
  }
}
