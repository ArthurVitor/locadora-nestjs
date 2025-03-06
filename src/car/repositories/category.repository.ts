import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/Category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  save(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  async findOneBy(key: keyof Category, value: any): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { [key]: value },
    });

    if (!category) {
      throw new NotFoundException(
        `Could not find category with ${key}: ${value}`,
      );
    }

    return category;
  }

  find(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
