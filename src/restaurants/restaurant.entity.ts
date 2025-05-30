/*eslint-disable*/
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity("restaurants")
export class RestaurantEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly restaurantId: string;

  @Column()
  name: string;

  @Column()
  type: string; // Tipo de comida (italiana, japonesa, etc.)

  @Column()
  price: number;

  @Column()
  address: string;

  @Column({ nullable: true })
  web: string;

  @Column({ default: 'restaurante' })
  readonly serviceType: string; 
  
  constructor(
    restaurantId: string,
    name: string,
    type: string,
    price: number,
    address: string,
    web: string | undefined,
  ) {
    super();
    this.restaurantId = restaurantId;
    this.name = name;
    this.type = type;
    this.price = price,
    this.address = address;
    this.web = web;
    this.serviceType = 'restaurante';
  }
}
