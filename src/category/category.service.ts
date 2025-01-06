import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/CreateCategoryDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/Category.entity';
import { MongoRepository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: MongoRepository<Category>,

    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(dto: CreateCategoryDto) {
    try {
      const createEntity = await this.categoryRepository.save(
        this.mapper.map(dto, CreateCategoryDto, Category),
      );

      return createEntity;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'Category with the same name already exists',
        );
      }
    }
  }
}
