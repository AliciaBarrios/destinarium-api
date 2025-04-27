/*eslint-disable*/
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { CategoryEntity } from '../categories/category.entity';
import { DayEntity } from '../days/day.entity';
import { UserEntity } from 'src/users/user.entity';
import { AccommodationEntity } from 'src/accommodations/accommodation.entity';
import { TransportEntity } from 'src/transports/transport.entity';
import { RestaurantEntity } from 'src/restaurants/restaurant.entity';

@Entity("itineraries")
export class ItineraryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  itineraryId: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ type: 'timestamp', nullable: true })
  publicationDate?: Date;

  @Column({ nullable: true })
  duration?: number;

  @Column({ nullable: true })
  destination?: string;

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  rating?: number;

  @Column({ nullable: true })
  budget?: number;

  @Column({ nullable: true })
  coverImage?: string;

  @ManyToOne(() => UserEntity, (user) => user.itineraries)
  user: UserEntity;
  
  @ManyToMany(() => CategoryEntity, {
    cascade: true,
  })
  @JoinTable()
  categories: CategoryEntity[];

  @OneToMany(() => DayEntity, day => day.itinerary)
  days?: DayEntity[];

  @ManyToMany(() => TransportEntity, {
    cascade: true,
  })
  @JoinTable()
  transports?: TransportEntity[];

  @ManyToMany(() => RestaurantEntity, {
    cascade: true,
  })
  @JoinTable()
  restaurants?: RestaurantEntity[];

  @ManyToMany(() => AccommodationEntity, {
    cascade: true,
  })
  @JoinTable()
  accommodations?: AccommodationEntity[];

  constructor(
    itineraryId: string,
    title: string,
    publicationDate: Date,
    duration: number,
    destination: string,
    startDate: Date,
    endDate: Date,
    rating: number,
    budget: number,
    coverImage: string,
    user: UserEntity,
    days: DayEntity[],
    categories: CategoryEntity[],
    transports:TransportEntity[],
    restaurants: RestaurantEntity[],
    accommodations: AccommodationEntity[],
  ) {
    super();
    this.itineraryId = itineraryId;
    this.title = title;
    this.publicationDate = publicationDate;
    this.duration = duration;
    this.destination = destination;
    this.startDate = startDate;
    this.endDate = endDate;
    this.rating = rating;
    this.budget = budget;
    this.coverImage = coverImage;
    this.user = user;
    this.days = days;
    this.categories = categories;
    this.transports = transports;
    this.restaurants = restaurants;
    this.accommodations = accommodations;
  }
}
