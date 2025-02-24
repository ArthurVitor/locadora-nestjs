import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/Category/CreateCategoryDto';
import { Category } from './entities/Category.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CategoryRepository } from './repositories/category.repository';
import { ListCategoryDto } from './dtos/Category/ListOptionalDto';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(dto: CreateCategoryDto) {
    try {
      const entity = this.mapper.map(dto, CreateCategoryDto, Category);

      return this.categoryRepository.save(entity);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'Category with the same name already exists',
        );
      }
    }
  }

  async getAll() {
    return this.mapper.mapArray(
      await this.categoryRepository.find(),
      Category,
      ListCategoryDto,
    );
  }
}
