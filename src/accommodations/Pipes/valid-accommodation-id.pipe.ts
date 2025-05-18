import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AccommodationService } from '../accommodation.service';

@Injectable()
export class ValidAccommodationIdPipe implements PipeTransform {
  constructor(private accommodationService: AccommodationService) {}
  async transform(value: string) {
    console.log('Validando alojamiento ID:', value);
    try {
      await this.accommodationService.getAccommodationById(value);
    } catch (err) {
      throw new BadRequestException("Accommodation ID don't exist");
    }
    return value;
  }
}
