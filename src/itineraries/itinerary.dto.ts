/*eslint-disable*/
import { ApiProperty } from '@nestjs/swagger';
import { AccommodationDto } from '../accommodations/accommodation.dto';
import { CategoryDto } from '../categories/category.dto';
import { DayDto } from '../days/day.dto';
import { RestaurantDto } from '../restaurants/restaurant.dto';
import { TransportDto } from '../transports/transport.dto';

export class ItineraryDto {
  @ApiProperty()
  readonly itineraryId?: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly publicationDate: Date;

  @ApiProperty()
  readonly userId: string;

  @ApiProperty()
  readonly duration: number;

  @ApiProperty()
  readonly destination: string;

  @ApiProperty()
  readonly startDate: Date;

  @ApiProperty()
  readonly endDate: Date;

  @ApiProperty()
  readonly rating: number;

  @ApiProperty()
  readonly categories: CategoryDto[];

  @ApiProperty()
  readonly budget: number;

  @ApiProperty()
  readonly coverImage?: string;

  @ApiProperty()
  readonly userAlias?: string;

  @ApiProperty({ type: [TransportDto] })
  readonly transports?: TransportDto[];

  @ApiProperty({ type: [AccommodationDto] })
  readonly accommodations?: AccommodationDto[];

  @ApiProperty({ type: [RestaurantDto] })
  readonly restaurants?: RestaurantDto[];

  @ApiProperty({ type: [DayDto] })
  readonly days?: DayDto[];

  constructor(
    itineraryId: string,
    title: string,
    publicationDate: Date,
    userId: string,
    userAlias: string,
    duration: number,
    destination: string,
    startDate: Date,
    endDate: Date,
    rating: number,
    budget: number,
    coverImage: string,
    transports: TransportDto[],
    accommodations: AccommodationDto[],
    restaurants: RestaurantDto[],
    categories: CategoryDto[],
    days: DayDto[],
  ) {
    this.itineraryId = itineraryId;
    this.title = title;
    this.publicationDate = publicationDate;
    this.userId = userId;
    this.userAlias = userAlias;
    this.duration = duration;
    this.destination = destination;
    this.startDate = startDate;
    this.endDate = endDate;
    this.rating = rating;
    this.budget = budget;
    this.coverImage = coverImage;
    this.transports = transports;
    this.accommodations = accommodations;
    this.restaurants = restaurants;
    this.categories = categories;
    this.days = days;
  }
}
