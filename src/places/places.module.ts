/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';

@Module({
  imports: [HttpModule],
  providers: [PlacesService],
  controllers: [PlacesController],
})
export class PlacesModule {}
