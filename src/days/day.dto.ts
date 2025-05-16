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

  @ApiProperty()
  readonly dayNumber?: number;

  @ApiProperty({ required: false })
  readonly itineraryId?: string;

  constructor(
    dayId: string,
    startLocation: string,
    endLocation: string,
    description: string,
    dayNumber?: number,
    itineraryId?: string,
  ) {
    this.dayId = dayId;
    this.startLocation = startLocation;
    this.endLocation = endLocation;
    this.description = description;
    this.dayNumber = dayNumber;
    this.itineraryId = itineraryId;
  }
}
