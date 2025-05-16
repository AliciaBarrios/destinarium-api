/*eslint-disable*/
import { ApiProperty } from '@nestjs/swagger';

export class DayDto {
  @ApiProperty()
  readonly dayId: string;

  @ApiProperty()
  readonly startLocation: string;

  @ApiProperty()
  readonly endLocation: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty({ required: false })
  readonly itineraryId?: string;

  constructor(
    dayId: string,
    startLocation: string,
    endLocation: string,
    description: string,
    itineraryId?: string,
  ) {
    this.dayId = dayId;
    this.startLocation = startLocation;
    this.endLocation = endLocation;
    this.description = description;
    this.itineraryId = itineraryId;
  }
}
