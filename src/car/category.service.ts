import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/Category/CreateCategoryDto';
import { Category } from './entities/Category.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CategoryRepository } from './repositories/category.repository';
import { ListCategoryDto } from './dtos/Category/ListCategoryDto';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(dto: CreateCategoryDto) {
    try {
      const entity = this.mapper.map(dto, CreateCategoryDto, Category);

      return this.categoryRepository.save(entity);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'Category with the same name already exists',
        );
      }
    }
  }

  async getAll(periodoRetirada: string, periodoDevolucao: string) {
    const retirada = new Date(periodoRetirada);
    const devolucao = new Date(periodoDevolucao);

    const categories = await this.categoryRepository.find([
      'cars',
      'cars.reservas',
    ]);

    const availableCategories = categories.filter((category) => {
      return category.cars.some((car) => {
        return !car.reservas.some((reserva) => {
          const reservaRetirada = new Date(reserva.retirada_agendada);
          const reservaDevolucao = new Date(reserva.devolucao_agendada);

          return (
            (retirada >= reservaRetirada && retirada <= reservaDevolucao) ||
            (devolucao >= reservaRetirada && devolucao <= reservaDevolucao) ||
            (retirada <= reservaRetirada && devolucao >= reservaDevolucao)
          );
        });
      });
    });

    return this.mapper.mapArray(availableCategories, Category, ListCategoryDto);
  }
}
