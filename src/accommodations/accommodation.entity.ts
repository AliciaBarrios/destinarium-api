/*eslint-disable*/
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity} from 'typeorm';
import { ItineraryEntity } from 'src/itineraries/itinerary.entity';

export enum AccommodationType {
  HOTEL = 'Hotel',
  APARTMENT = 'Apartamento',
  HOSTEL = 'Hostal',
  CAMPING = 'Camping',
  HOUSE = 'Casa',
  RURAL_HOUSE = 'Casa Rural',
  OTHER = 'Otro',
}

@Entity("accommodations")
export class AccommodationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  accommodationId: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ type: 'enum', enum: AccommodationType })
  type: AccommodationType;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'decimal' })
  rating: number;

  @Column({ nullable: true })
  web?: string;

  constructor(
    accommodationId: string,
    name: string,
    location: string,
    type: AccommodationType,
    price: number,
    rating: number,
    web: string | undefined,
  ) {
    super();
    this.accommodationId = accommodationId;
    this.name = name;
    this.location = location;
    this.type = type;
    this.price = price;
    this.rating = rating;
    this.web = web;
  }
}
