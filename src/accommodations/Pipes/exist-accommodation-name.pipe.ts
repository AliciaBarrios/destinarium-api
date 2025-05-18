import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AccommodationDto } from '../accommodation.dto';
import { AccommodationService } from '../accommodation.service';

@Injectable()
export class ExistAccomodationNamePipe implements PipeTransform {
  constructor(private accommodationService: AccommodationService) {}
  async transform(value: AccommodationDto) {
    const numName: number =
      await this.accommodationService.accommodationNameAlreadyExist(value);

    if (numName > 0) {
      throw new BadRequestException('Accommodation value already exists');
    }

    return value;
  }
}
