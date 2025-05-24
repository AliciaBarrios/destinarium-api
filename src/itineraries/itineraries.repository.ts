/*eslint-disable*/
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getConnection, Repository, In } from 'typeorm';
import { ItineraryDto } from './itinerary.dto';
import { ItineraryEntity } from './itinerary.entity';
import { ItineraryMapper } from './itinerary.mapper';
import { AccommodationEntity } from 'src/accommodations/accommodation.entity';

export class ItiinerariesRepository {
  constructor(
    @InjectRepository(ItineraryEntity)
    private itinerariesRepository: Repository<ItineraryEntity>,
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

  getItinerariesByDestination(destination: string): Promise<ItineraryEntity[]> {
    return this.itinerariesRepository.find({
      where: { destination },
      relations: ['categories', 'days'],
    });
  }

  async getItinerariesByRating(rating: number): Promise<ItineraryEntity[]> {
    return this.itinerariesRepository.find({
      where: { rating: rating },
      relations: ['user', 'categories', 'days'],
    });
  }

  async getItinerariesByDuration(
    durationType: 'short' | 'medium' | 'long' | 'extended' | 'very_long',
  ): Promise<ItineraryEntity[]> {
    const query = this.itinerariesRepository
      .createQueryBuilder('itinerary')
      .leftJoinAndSelect('itinerary.user', 'user')
      .leftJoinAndSelect('itinerary.categories', 'categories')
      .leftJoinAndSelect('itinerary.days', 'days');

    switch (durationType) {
      case 'short':
        query.where('itinerary.num_days < :max', { max: 7 });
        break;
      case 'medium':
        query.where('itinerary.num_days BETWEEN :min AND :max', {
          min: 7,
          max: 14,
        });
        break;
      case 'long':
        query.where('itinerary.num_days BETWEEN :min AND :max', {
          min: 15,
          max: 21,
        });
        break;
      case 'extended':
        query.where('itinerary.num_days BETWEEN :min AND :max', {
          min: 22,
          max: 30,
        });
        break;
      case 'very_long':
        query.where('itinerary.num_days > :min', { min: 30 });
        break;
      default:
        return this.itinerariesRepository.find({
          relations: ['user', 'categories', 'days'],
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

  deleteItinerary(id: string): Promise<DeleteResult> {
    return this.itinerariesRepository.delete(id);
  }
}
