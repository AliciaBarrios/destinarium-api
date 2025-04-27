/*eslint-disable*/

import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ItinerariesService } from '../itineraries.service';

@Injectable()
export class ValidItineraryIdPipe implements PipeTransform {
  constructor(private itinerariesService: ItinerariesService) {}
  async transform(value: any) {
    try {
      await this.itinerariesService.getItineraryById(value);
    } catch (err) {
      throw new BadRequestException("Itinerary ID don't exist");
    }
    return value;
  }
}
