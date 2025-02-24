import { Injectable } from '@nestjs/common';
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

  findOneBy(key: keyof Category, value: any): Promise<Category> {
    return this.categoryRepository.findOneBy({ [key]: value });
  }

  find(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
