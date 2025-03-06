import { BadRequestException, Injectable } from '@nestjs/common';
import { ReservaRepository } from './repositories/reserva.repository';
import { ListReservaDto } from './dtos/Reserva/ListReservaDto';
import { CreateReservaDto } from './dtos/Reserva/CreateReservaDto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Reserva } from './entities/Reserva.entity';
import { CarRepository } from 'src/car/repositories/car.repository';
import { SeguroRepository } from './repositories/seguro.repository';
import { ItemReservaRepository } from './repositories/itemReserva.repository';

@Injectable()
export class ReservaService {
  constructor(
    private reservaRepository: ReservaRepository,
    private carRepository: CarRepository,
    private seguroRepository: SeguroRepository,
    private itemReservaRepository: ItemReservaRepository,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(dto: CreateReservaDto): Promise<ListReservaDto> {
    const [car, seguro, itens] = await Promise.all([
      this.carRepository.findOneBy('id', dto.carro_id),
      this.seguroRepository.findOneBy('id', dto.seguro_id),
      Promise.all(
        dto.itensReserva.map((item) =>
          this.itemReservaRepository.findOneBy('name', item),
        ),
      ),
    ]);

    const entity = this.mapper.map(dto, CreateReservaDto, Reserva);
    entity.car = car;
    entity.seguro = seguro;
    entity.data_retirada = new Date();
    entity.items = itens;

    await this.isCarAvailable(entity);

    const savedEntity = await this.reservaRepository.save(entity);
    return this.mapper.map(savedEntity, Reserva, ListReservaDto);
  }

  private async isCarAvailable(entity: Reserva) {
    if (!(await this.reservaRepository.isCarAvailable(entity))) {
      throw new BadRequestException(
        'Car not available for the informed period',
      );
    }
  }
}
