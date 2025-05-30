import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './restaurant.entity';
import { RestaurantMapper } from './restaurants.mapper';
import { RestaurantRepository } from './restaurant.repository';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity])],
  controllers: [RestaurantController],
  providers: [RestaurantMapper, RestaurantRepository, RestaurantService],
  exports: [RestaurantService, TypeOrmModule],
})
export class RestaurantModule {}
