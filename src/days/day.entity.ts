/*eslint-disable*/
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItineraryEntity } from '../itineraries/itinerary.entity';

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

  @Column()
  dayNumber: number;

  @ManyToOne(() => ItineraryEntity, (itinerary) => itinerary.days, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'itineraryId' })
  itinerary: ItineraryEntity;

  @Column()
  itineraryId: string;

  constructor(
    dayId: string,
    startLocation: string,
    endLocation: string,
    description: string,
    dayNumber: number,
  ) {
    super();
    this.dayId = dayId;
    this.startLocation = startLocation;
    this.endLocation = endLocation;
    this.description = description;
    this.dayNumber = dayNumber;
  }
}
