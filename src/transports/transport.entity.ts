/*eslint-disable*/
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ItineraryEntity } from 'src/itineraries/itinerary.entity';

export enum TransportType {
    PLANE = 'Avión',
    TRAIN = 'Tren',
    CAR = 'Coche',
    BUS = 'Bus',
    BIKE = 'Bicicleta',
    MOTORBIKE = 'Moto',
    BOAT = "Barco",
    HELICOPTER = "Helicóptero",
}

@Entity("transports")
export class TransportEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  transportId: string;

  @Column({ type: 'enum', enum: TransportType })
  type: TransportType; // Avión, Tren, Coche, etc.

  @Column({ nullable: true })
  company?: string;

  @Column({ type: 'decimal' })
  rating: number;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  location: string;

  @Column({ nullable: true })
  web?: string;

  constructor(
    transportId: string,
    type: TransportType,
    company: string | undefined,
    rating: number,
    price: number,
    location: string,
    web: string | undefined,
  ) {
    super();
    this.transportId = transportId;
    this.type = type;
    this.company = company;
    this.rating = rating;
    this.price = price;
    this.location = location;
    this.web = web;
  }
}
