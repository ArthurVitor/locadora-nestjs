import { ListCategoryDto } from '../dtos/Category/ListCategoryDto';
import { Category } from '../entities/Category.entity';

export class CategoryStub {
  static getValidCategory(): Category {
    return {
      id: 1,
      name: 'SUV',
      cars: [],
      dailyPrice: 100,
      description: 'SUV',
    };
  }

  static getValidCategoryDto(): ListCategoryDto {
    return {
      id: 1,
      name: 'SUV',
      dailyPrice: 100,
      description: 'SUV',
    };
  }
}
