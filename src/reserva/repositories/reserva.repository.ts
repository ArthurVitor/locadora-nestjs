import { Injectable } from '@nestjs/common';
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

  async isCarAvailable(
    carro_id: number,
    periodo_retirada: Date,
    periodo_devolucao: Date,
  ): Promise<boolean> {
    const existingReserva = await this.repository
      .createQueryBuilder('reserva')
      .where('reserva.carro_id = :carroId', { carroId: carro_id })
      .andWhere(
        '(reserva.periodo_retirada BETWEEN :inicio AND :fim OR reserva.periodo_devolucao BETWEEN :inicio AND :fim OR (:inicio BETWEEN reserva.periodo_retirada AND reserva.periodo_devolucao))',
        {
          inicio: periodo_retirada,
          fim: periodo_devolucao,
        },
      )
      .getOne();

    return !existingReserva;
  }
}
