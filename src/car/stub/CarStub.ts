import { CreateCarDto } from '../dtos/Car/CreateCarDto';
import { ListCarDto } from '../dtos/Car/ListCarDto';
import { Car } from '../entities/Car.entity';
import { BrandStub } from './BrandStub';
import { CategoryStub } from './CategoryStub';
import { OptionalsStub } from './OptionalsStub';

export class CarStub {
  static getValidCar(): Car {
    return {
      id: 1,
      model: 'Corolla',
      year: 2021,
      isAvailable: true,
      plate: 'MENGAO123',
      brand: BrandStub.getValidBrand(),
      category: CategoryStub.getValidCategory(),
      optionals: [OptionalsStub.getValidOptionals()],
    };
  }

  static getValidCarDto(): ListCarDto {
    return {
      id: 1,
      model: 'Corolla',
      year: 2021,
      isAvailable: true,
      plate: 'MENGAO123',
      brand: BrandStub.getValidBrandDto(),
      category: CategoryStub.getValidCategoryDto(),
      optionals: [OptionalsStub.getValidOptionalsDto()],
    };
  }

  static getCreateCarDto(): CreateCarDto {
    return {
      model: 'Corolla',
      year: 2021,
      plate: 'MENGAO123',
      brand: 'Toyota',
      category: 'SUV',
      optionals: ['Airbag'],
    };
  }
}
