import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TransportDto } from '../transport.dto';
import { TransportService } from '../transport.service';

@Injectable()
export class ExistTransportCompanyPipe implements PipeTransform {
  constructor(private transportService: TransportService) {}
  async transform(value: TransportDto) {
    const numName: number =
      await this.transportService.transportCompanyAlreadyExist(value);

    if (numName > 0) {
      throw new BadRequestException('Transport value already exists');
    }

    return value;
  }
}
