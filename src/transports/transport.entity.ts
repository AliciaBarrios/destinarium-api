/*eslint-disable*/
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  readonly transportId: string;

  @Column({ type: 'enum', enum: TransportType })
  type: TransportType;

  @Column({ nullable: true })
  company?: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  web?: string;

  @Column({ default: 'transporte' })
  readonly serviceType: string; 

  constructor(
    transportId: string,
    type: TransportType,
    company: string | undefined,
    address: string,
    web: string | undefined,
  ) {
    super();
    this.transportId = transportId;
    this.type = type;
    this.company = company;
    this.address = address;
    this.web = web;
    this.serviceType = 'transporte';
  }
}
