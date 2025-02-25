import { ConflictException, Injectable } from '@nestjs/common';
import { Car } from './entities/Car.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateCarDto } from './dtos/Car/CreateCarDto';
import { ListCarDto } from './dtos/Car/ListCarDto';
import { UpdateCarDto } from './dtos/Car/UpdateCarDto';
import { Optionals } from './entities/Optionals.entity';
import { CarRepository } from './repositories/car.repository';
import { BrandRepository } from './repositories/brand.repository';
import { OptionalsRepository } from './repositories/optionals.repository';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class CarService {
  constructor(
    private carRepository: CarRepository,
    private brandRepository: BrandRepository,
    private optionalRepository: OptionalsRepository,
    private categoryRepository: CategoryRepository,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async getAll(
    category?: string,
    brand?: string,
    model?: string,
    optionals: string[] = [],
  ) {
    const entities = await this.carRepository.findAll(
      category,
      brand,
      model,
      optionals,
      ['brand', 'category', 'optionals'],
    );

    return this.mapper.mapArray(entities, Car, ListCarDto);
  }

  async create(dto: CreateCarDto): Promise<Car> {
    const category = await this.categoryRepository.findOneBy(
      'name',
      dto.category,
    );

    const brand = await this.brandRepository.findOneBy('name', dto.brand);

    const optionals: Optionals[] = await Promise.all(
      dto.optionals.map(async (opt) => {
        return await this.optionalRepository.findOneBy('name', opt);
      }),
    );

    try {
      const entity = this.mapper.map(dto, CreateCarDto, Car);
      entity.brand = brand;
      entity.category = category;
      entity.optionals = optionals;

      return await this.carRepository.save(entity);
    } catch (error) {
      if (error.code == 11000) {
        throw new ConflictException('Plate must be unique');
      }

      throw error;
    }
  }

  async delete(id: number) {
    this.carRepository.delete(id);
  }

  async getById(id: number) {
    const car = await this.carRepository.findOneBy('id', id);

    return this.mapper.map(car, Car, ListCarDto);
  }

  async patch(id: number, dto: UpdateCarDto) {
    const car = await this.carRepository.findOneBy('id', id);

    Object.assign(car, dto);
    const updatedCar = await this.carRepository.save(car);

    return this.mapper.map(updatedCar, Car, ListCarDto);
  }
}
