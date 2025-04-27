/*eslint-disable*/
import { ApiProperty } from '@nestjs/swagger';

export class PointOfInterestDto {
    @ApiProperty()
    readonly interestPointId?: string;
  
    @ApiProperty()
    readonly name: string;
  
    @ApiProperty()
    readonly category: string; // Monumento, museo, parque, etc.
  
    @ApiProperty()
    readonly location: string;

    @ApiProperty()
    readonly rating: number;
  
    constructor(interestPointId: string, name: string, category: string, location: string, rating:number,) {
      this.interestPointId = interestPointId;
      this.name = name;
      this.category = category;
      this.location = location;
      this.rating = rating;
    }
  }