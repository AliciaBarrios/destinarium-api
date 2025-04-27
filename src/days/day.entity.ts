/*eslint-disable*/
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccommodationEntity } from 'src/accommodations/accommodation.entity';
import { ItineraryEntity } from '../itineraries/itinerary.entity';
import { InterestPointEntity } from '../points_of_interest/point-of-interest.entity';
import { RestaurantEntity } from '../restaurants/restaurant.entity';
import { TransportEntity } from '../transports/transport.entity';

@Entity("days")
export class DayEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  dayId: string;

  @Column()
  startLocation: string;

  @Column()
  endLocation: string;

  @Column()
  description: string;

  @ManyToOne(() => ItineraryEntity, (itinerary) => itinerary.days, {
    onDelete: 'CASCADE',
  })
  itinerary: ItineraryEntity;

    constructor(
      dayId: string,
      startLocation: string,
      endLocation: string,
      description: string,
      // itinerary: ItineraryEntity,
    ) {
      super();
      this.dayId = dayId;
      this.startLocation = startLocation;
      this.endLocation = endLocation;
      this.description = description;
      // this.itinerary = itinerary;
    }
}
