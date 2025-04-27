// import { ItineraryEntity } from '../itineraries/itinerary.entity';
import {
  BaseEntity,
  Column,
  Entity,
  // ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly categoryId: string;

  @Column({ unique: true, length: 55 })
  title: string;

  constructor(categoryId: string, title: string) {
    super();
    this.categoryId = categoryId;
    this.title = title;
  }
}
