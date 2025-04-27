/*eslint-disable*/
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity } from 'typeorm';
import { ItineraryEntity } from 'src/itineraries/itinerary.entity';

@Entity("restaurants")
export class RestaurantEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  restaurantId: string;

  @Column()
  name: string;

  @Column()
  type: string; // Tipo de comida (italiana, japonesa, etc.)

  @Column()
  price: number;

  @Column()
  location: string;

  @Column()
  rating: number;

  @Column({ nullable: true })
  web: string;
  
  constructor(
    restaurantId: string,
    name: string,
    type: string,
    price: number,
    location: string,
    rating: number,
    web: string,
  ) {
    super();
    this.restaurantId = restaurantId;
    this.name = name;
    this.type = type;
    this.price = price,
    this.location = location;
    this.rating = rating;
    this.web = web;
  }
}
