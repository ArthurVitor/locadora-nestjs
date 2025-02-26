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
}
