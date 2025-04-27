import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CategoriesService } from '../categories.service';

@Injectable()
export class ValidCategoryIdPipe implements PipeTransform {
  constructor(private categoriesService: CategoriesService) {}
  async transform(value: string) {
    console.log('Validando categoría ID:', value);
    try {
      await this.categoriesService.getCategoryById(value);
    } catch (err) {
      throw new BadRequestException("Category ID don't exist");
    }
    return value;
  }
}
