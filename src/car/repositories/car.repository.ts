import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../entities/Car.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CarRepository {
  constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}

  async save(car: Car): Promise<Car> {
    return this.carRepository.save(car);
  }

  async findAll(
    category?: string,
    brand?: string,
    model?: string,
    optionals: string[] = [],
    relations: string[] = [],
  ): Promise<Car[]> {
    const where: any = {};

    if (category) where.category = { name: category };
    if (brand) where.brand = { name: brand };
    if (model) where.model = model;
    if (optionals.length) where.optionals = { name: In(optionals) };

    return this.carRepository.find({
      where,
      relations,
    });
  }

  async findOneBy(key: keyof Car, value: any): Promise<Car> {
    return this.carRepository.findOneBy({ [key]: value });
  }

  async delete(id: number): Promise<void> {
    await this.carRepository.delete(id);
  }
}
