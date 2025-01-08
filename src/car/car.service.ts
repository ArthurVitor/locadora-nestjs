import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/Car.entity';
import { MongoRepository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateCarDto } from './dtos/CreateCarDto';
import { ListCarDto } from './dtos/ListCarDto';
import { ObjectId } from 'mongodb';
import { UpdateCarDto } from './dtos/UpdateCarDto';
import { Category } from 'src/category/entities/Category.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private carRepository: MongoRepository<Car>,
    @InjectRepository(Category)
    private categoryRepository: MongoRepository<Category>,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async getAll(isAvailable: boolean) {
    const dtos = (await this.carRepository.find())
      .filter((car) => car.isAvailable == isAvailable)
      .map((car) => this.mapper.map(car, Car, ListCarDto));
    return dtos;
  }

  async create(dto: CreateCarDto): Promise<Car> {
    if (!(await this.categoryRepository.findOneBy({ name: dto.category }))) {
      throw new NotFoundException('There is no category ' + dto.category);
    }

    try {
      const entity = this.mapper.map(dto, CreateCarDto, Car);

      return await this.carRepository.save(entity);
    } catch (error) {
      if (error.code == 11000) {
        throw new ConflictException('Plate must be unique');
      }

      throw error;
    }
  }

  async delete(id: string) {
    this.carRepository.delete(id);
  }

  async getById(id: ObjectId) {
    const car = await this.carRepository.findOneBy(id);
    if (!car) {
      throw new NotFoundException(
        'Could not find car with id: ' + id.toString(),
      );
    }

    return this.mapper.map(car, Car, ListCarDto);
  }

  async patch(id: ObjectId, dto: UpdateCarDto) {
    const car = await this.carRepository.findOneBy(id);

    if (!car) {
      throw new NotFoundException(
        'Could not find car with id: ' + id.toString(),
      );
    }

    Object.assign(car, dto);
    const updatedCar = await this.carRepository.save(car);

    return this.mapper.map(updatedCar, Car, ListCarDto);
  }
}
