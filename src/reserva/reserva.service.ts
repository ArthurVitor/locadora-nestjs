import { Injectable } from '@nestjs/common';
import { ReservaRepository } from './repositories/reserva.repository';
import { ListReservaDto } from './dtos/Reserva/ListReservaDto';
import { CreateReservaDto } from './dtos/Reserva/CreateReservaDto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Reserva } from './entities/Reserva.entity';
import { CarRepository } from 'src/car/repositories/car.repository';

@Injectable()
export class ReservaService {
  constructor(
    private reservarRepository: ReservaRepository,
    private carRepository: CarRepository,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(dto: CreateReservaDto): Promise<ListReservaDto> {
    const entity = this.mapper.map(dto, CreateReservaDto, Reserva);
    entity.car = await this.carRepository.findOneBy('id', dto.carro_id);

    return await this.mapper.map(
      await this.reservarRepository.save(entity),
      Reserva,
      ListReservaDto,
    );
  }
}
