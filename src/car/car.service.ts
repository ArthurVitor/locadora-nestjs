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

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private carRepository: MongoRepository<Car>,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async getAll(): Promise<ListCarDto[]> {
    return this.carRepository
      .find()
      .then((cars) => this.mapper.mapArray(cars, Car, ListCarDto));
  }

  async create(dto: CreateCarDto): Promise<Car> {
    if (this.carRepository.findOneBy({ plate: dto.plate })) {
      throw new ConflictException('Plate must be UNIQUE');
    }

    const entity = this.mapper.map(dto, CreateCarDto, Car);

    return await this.carRepository.save(entity);
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
