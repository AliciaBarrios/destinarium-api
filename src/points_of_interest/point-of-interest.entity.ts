/*eslint-disable*/
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity } from 'typeorm';
import { ItineraryEntity } from 'src/itineraries/itinerary.entity';

export enum InterestPointCategory {
  MONUMENT = 'Monumento',
  MUSEUM = 'Museo',
  PARK = 'Parque',
  NATURAL_SITE = 'Aire Libre',
  HISTORICAL = 'Historico',
  OTHER = 'Otro',
}

@Entity("interestPoints")
export class InterestPointEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  interestPointId: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: InterestPointCategory })
  category: InterestPointCategory;

  @Column()
  location: string;

  @Column({ type: 'decimal' })
  rating: number;

  // @ManyToMany(() => ItineraryEntity, (itineraries) => itineraries.interestPoints, {
  //   onDelete: 'CASCADE',
  // })
  // itineraries: ItineraryEntity;

  constructor(
    interestPointId: string,
    name: string,
    category: InterestPointCategory,
    location: string,
    rating: number,
    // itineraries: ItineraryEntity,
  ) {
    super();
    this.interestPointId = interestPointId;
    this.name = name;
    this.category = category;
    this.location = location;
    this.rating = rating;
    // this.itineraries = itineraries;
  }
}
