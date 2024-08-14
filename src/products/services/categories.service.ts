import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  getAllCategories() {
    return this.categoryRepo.find();
  }

  async getOneCategory(categoryId: number) {
    const category = await this.categoryRepo.findOne({
      where: { categoryId: categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category ${categoryId} not found`);
    }
    return category;
  }

  createCategory(data: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(data);
    return this.categoryRepo.save(newCategory);
  }

  async updateCategory(categoryId: number, changes: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne({
      where: { categoryId: categoryId },
    });
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  async deleteCategory(categoryId: number) {
    const deleteResult = await this.categoryRepo.delete(categoryId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Category ${categoryId} not found`);
    }
    return deleteResult;
  }
}
