import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from '../entities/Reserva.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservaRepository {
  constructor(
    @InjectRepository(Reserva) private repository: Repository<Reserva>,
  ) {}

  async save(entity: Reserva): Promise<Reserva> {
    return await this.repository.save(entity);
  }

  async isCarAvailable(entity: Reserva): Promise<boolean> {
    const existingReserva = await this.repository
      .createQueryBuilder('reserva')
      .where('reserva.carro_id = :carroId', { carroId: entity.car.id })
      .andWhere(
        '(reserva.retirada_agendada BETWEEN :inicio AND :fim OR reserva.devolucao_agendada BETWEEN :inicio AND :fim OR (:inicio BETWEEN reserva.retirada_agendada AND reserva.devolucao_agendada))',
        {
          inicio: entity.retirada_agendada,
          fim: entity.devolucao_agendada,
        },
      )
      .getOne();

    return !existingReserva;
  }

  async findOneBy(key: keyof Reserva, value: any, relations: string[] = []) {
    const reserva = await this.repository.findOne({
      where: { [key]: value },
      relations: relations,
    });

    if (!reserva) {
      throw new NotFoundException(
        'Could not find reserva with key ' + key + 'and ' + value,
      );
    }

    return reserva;
  }
}
