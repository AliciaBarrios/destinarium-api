import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TransportService } from '../transport.service';

@Injectable()
export class ValidTransportIdPipe implements PipeTransform {
  constructor(private transportService: TransportService) {}
  async transform(value: string) {
    console.log('Validando transporte ID:', value);
    try {
      await this.transportService.getTransportById(value);
    } catch (err) {
      throw new BadRequestException("Transporte ID don't exist");
    }
    return value;
  }
}
