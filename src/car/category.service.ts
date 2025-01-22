import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/Category/CreateCategoryDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/Category.entity';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(dto: CreateCategoryDto) {
    try {
      const entity = this.mapper.map(dto, CreateCategoryDto, Category);
      console.log(entity);

      return await this.categoryRepository.save(entity);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'Category with the same name already exists',
        );
      }
    }
  }
}
