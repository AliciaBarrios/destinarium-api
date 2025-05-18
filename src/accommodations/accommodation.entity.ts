/*eslint-disable*/
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

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
  readonly accommodationId: string;

  @Column()
  name: string;

  @Column()
  adress: string;

  @Column({ type: 'enum', enum: AccommodationType })
  type: AccommodationType;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ nullable: true })
  web?: string;

  constructor(
    accommodationId: string,
    name: string,
    adress: string,
    type: AccommodationType,
    price: number,
    web: string | undefined,
  ) {
    super();
    this.accommodationId = accommodationId;
    this.name = name;
    this.adress = adress;
    this.type = type;
    this.price = price;
    this.web = web;
  }
}
