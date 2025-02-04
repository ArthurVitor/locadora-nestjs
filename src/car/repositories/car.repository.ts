import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../entities/Car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarRepository {
  constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}

  async save(car: Car): Promise<Car> {
    return this.carRepository.save(car);
  }

  async findAll(relations: string[] = []): Promise<Car[]> {
    return this.carRepository.find({ relations });
  }

  async findOneBy(key: keyof Car, value: any): Promise<Car> {
    return this.carRepository.findOneBy({ [key]: value });
  }

  async delete(id: number): Promise<void> {
    await this.carRepository.delete(id);
  }
}
