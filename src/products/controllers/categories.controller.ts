import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get(':categoryId')
  findCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoryService.getOneCategory(categoryId);
  }

  @Post()
  createCategory(@Body() payload: CreateCategoryDto) {
    return this.categoryService.createCategory(payload);
  }

  @Put(':categoryId')
  updateCategory(
    @Body() payload: UpdateCategoryDto,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.categoryService.updateCategory(categoryId, payload);
  }

  @Delete(':categoryId')
  deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoryService.deleteCategory(categoryId);
  }
}
