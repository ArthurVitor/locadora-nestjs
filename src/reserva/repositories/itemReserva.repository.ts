import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemReserva } from '../entities/ItemReserva.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemReservaRepository {
  constructor(
    @InjectRepository(ItemReserva) private repository: Repository<ItemReserva>,
  ) {}

  async save(entity: ItemReserva): Promise<ItemReserva> {
    return await this.repository.save(entity);
  }
}
