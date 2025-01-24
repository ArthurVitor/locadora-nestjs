import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/Car.entity';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Category } from 'src/car/entities/Category.entity';
import { CreateCarDto } from './dtos/Car/CreateCarDto';
import { ListCarDto } from './dtos/Car/ListCarDto';
import { UpdateCarDto } from './dtos/Car/UpdateCarDto';
import { Brand } from 'src/car/entities/Brand.entity';
import { Optionals } from './entities/Optionals.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private carRepository: Repository<Car>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    @InjectRepository(Optionals)
    private optionalRepository: Repository<Optionals>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async getAll(isAvailable: boolean) {
    const entities = await this.carRepository.find({
      relations: ['brand', 'category', 'optionals'],
    });

    return this.mapper.mapArray(
      entities.filter((car) => car.isAvailable === isAvailable),
      Car,
      ListCarDto,
    );
  }

  async create(dto: CreateCarDto): Promise<Car> {
    const category = await this.categoryRepository.findOneBy({
      name: dto.category,
    });
    if (!category) {
      throw new NotFoundException('There is no category ' + dto.category);
    }

    const brand = await this.brandRepository.findOneBy({ name: dto.brand });
    if (!brand) {
      throw new NotFoundException('There is no brand ' + dto.brand);
    }

    const optionals: Optionals[] = await Promise.all(
      dto.optionals.map(async (opt) => {
        const optional = await this.optionalRepository.findOneBy({ name: opt });
        if (!optional) {
          throw new NotFoundException('There is no optional ' + opt);
        }
        return optional;
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

  async delete(id: string) {
    this.carRepository.delete(id);
  }

  async getById(id: number) {
    const car = await this.carRepository.findOne({ where: { id } });
    if (!car) {
      throw new NotFoundException(
        'Could not find car with id: ' + id.toString(),
      );
    }

    return this.mapper.map(car, Car, ListCarDto);
  }

  async patch(id: number, dto: UpdateCarDto) {
    const car = await this.carRepository.findOne({ where: { id } });

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
