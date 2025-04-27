import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty()
  readonly categoryId?: string;

  @ApiProperty()
  readonly title: string;

  constructor(categoryId: string, title: string) {
    this.categoryId = categoryId;
    this.title = title;
  }
}
