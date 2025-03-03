import { BadRequestException, Injectable } from '@nestjs/common';
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
    private reservaRepository: ReservaRepository,
    private carRepository: CarRepository,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(dto: CreateReservaDto): Promise<ListReservaDto> {
    const entity = this.mapper.map(dto, CreateReservaDto, Reserva);
    entity.car = await this.carRepository.findOneBy('id', dto.carro_id);
    entity.data_retirada = new Date();

    await this.isCarAvailable(entity);

    return await this.mapper.map(
      await this.reservaRepository.save(entity),
      Reserva,
      ListReservaDto,
    );
  }

  private async isCarAvailable(entity: Reserva) {
    if (!(await this.reservaRepository.isCarAvailable(entity))) {
      throw new BadRequestException(
        'Car not available for the informed period',
      );
    }
  }
}
