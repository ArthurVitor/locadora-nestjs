import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReservaRepository } from './repositories/reserva.repository';
import { ListReservaDto } from './dtos/Reserva/ListReservaDto';
import { CreateReservaDto } from './dtos/Reserva/CreateReservaDto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Reserva } from './entities/Reserva.entity';
import { CarRepository } from 'src/car/repositories/car.repository';
import { SeguroRepository } from './repositories/seguro.repository';
import { ItemReservaRepository } from './repositories/itemReserva.repository';
import { CreateCheckinDto } from './dtos/Reserva/CreateCheckinDto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { ListCheckinDto } from './dtos/Reserva/ListCheckinDto';

@Injectable()
export class ReservaService {
  constructor(
    private reservaRepository: ReservaRepository,
    private carRepository: CarRepository,
    private seguroRepository: SeguroRepository,
    private itemReservaRepository: ItemReservaRepository,
    private userRepository: UserRepository,
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
    entity.items = itens;

    await this.isCarAvailable(entity);

    const savedEntity = await this.reservaRepository.save(entity);
    return this.mapper.map(savedEntity, Reserva, ListReservaDto);
  }

  async checkin(dto: CreateCheckinDto): Promise<ListCheckinDto> {
    const reserva = await this.reservaRepository.findOneBy(
      'id',
      dto.reservaId,
      ['items', 'car.category', 'user'],
    );

    if (reserva.inProgess) {
      throw new BadRequestException('Reserva already in progress');
    }

    if (reserva.data_devolucao) {
      throw new BadRequestException('Reserva already finished');
    }

    reserva.user ??= await this.userRepository.findOneBy('id', dto.userId);
    if (!reserva.user) {
      throw new NotFoundException(`User not found with id ${dto.userId}`);
    }

    Object.assign(reserva, {
      valor_total: this.calculateTotal(reserva),
      data_retirada: new Date(),
      inProgess: true,
    });

    const reservaDto = this.mapper.map(
      await this.reservaRepository.save(reserva),
      Reserva,
      ListReservaDto,
    );

    return {
      reserva: reservaDto,
      user: { id: reserva.user.id, name: reserva.user.name },
      total: reserva.valor_total,
    };
  }

  async checkout(reservaId: number, userId: number) {
    const reserva = await this.reservaRepository.findOneBy('id', reservaId, [
      'user',
      'car.category',
      'items',
    ]);

    if (reserva.user.id !== userId) {
      throw new BadRequestException('Only the owner can checkout');
    }

    const diasAtraso = reserva.getDiasDeAtraso();
    if (!(diasAtraso > 0)) {
      reserva.valor_total += reserva.car.category.dailyPrice * diasAtraso;
    }

    reserva.inProgess = false;
    reserva.data_devolucao = new Date();

    return this.mapper.map(
      await this.reservaRepository.save(reserva),
      Reserva,
      ListReservaDto,
    );
  }

  private calculateTotal(reserva: Reserva): number {
    const reservaDays = this.getReservaDuration(reserva);

    const itemsTotal = reserva.items.reduce(
      (total, item) =>
        total + (item.dailyPriced ? item.price * reservaDays : item.price),
      0,
    );

    return itemsTotal + reserva.car.category.dailyPrice * reservaDays;
  }

  private getReservaDuration(reserva: Reserva) {
    const retirada = new Date(reserva.retirada_agendada);
    const devolucao = new Date(reserva.devolucao_agendada);

    const miliseconds = devolucao.getTime() - retirada.getTime();
    const days = miliseconds / (1000 * 60 * 60 * 24);

    return days;
  }

  private async isCarAvailable(entity: Reserva) {
    if (!(await this.reservaRepository.isCarAvailable(entity))) {
      throw new BadRequestException(
        'Car not available for the informed period',
      );
    }
  }
}
