import { CategoryDto } from './category.dto';
import { CategoryEntity } from './category.entity';

export class CategoryMapper {
  async dtoToEntity(categoryDTO: CategoryDto): Promise<CategoryEntity> {
    return new CategoryEntity(categoryDTO.categoryId, categoryDTO.title);
  }

  entityToDto(categoryEntity: CategoryEntity): CategoryDto {
    return new CategoryDto(categoryEntity.categoryId, categoryEntity.title);
  }
}
