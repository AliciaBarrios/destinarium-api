import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './category.dto';
import { ExistCategoryTitlePipe } from './Pipes/exist-category-title.pipe';
import { ValidCategoryIdPipe } from './Pipes/valid-category-id.pipe';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories(): Promise<CategoryDto[]> {
    return await this.categoriesService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(
    @Param('id', ValidCategoryIdPipe) id: string,
  ): Promise<CategoryDto> {
    return await this.categoriesService.getCategoryById(id);
  }

  @Post()
  @UsePipes(ExistCategoryTitlePipe)
  async newCategory(@Body() category: CategoryDto): Promise<CategoryDto> {
    return await this.categoriesService.newCategory(category);
  }

  @Put(':id')
  @UsePipes(ExistCategoryTitlePipe)
  async updateCategory(
    @Param('id', ValidCategoryIdPipe) id: string,
    @Body() category: CategoryDto,
  ): Promise<CategoryDto> {
    return await this.categoriesService.updateCategory(id, category);
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id', ValidCategoryIdPipe) id: string,
  ): Promise<DeleteResult> {
    return await this.categoriesService.deleteCategory(id);
  }
}
