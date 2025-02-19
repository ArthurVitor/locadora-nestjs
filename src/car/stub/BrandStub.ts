import { ListBrandDto } from '../dtos/Brand/ListBrandDto';
import { Brand } from '../entities/Brand.entity';

export class BrandStub {
  static getValidBrand(): Brand {
    return {
      id: 1,
      name: 'Toyota',
      cars: [],
    };
  }

  static getValidBrandDto(): ListBrandDto {
    return {
      id: 1,
      name: 'Toyota',
    };
  }
}
