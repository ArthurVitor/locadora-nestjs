import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOneBy(key: keyof ItemReserva, value: any) {
    const itemReserva = this.repository.findOne({
      where: {
        [key]: value,
      },
    });

    if (!itemReserva) {
      throw new NotFoundException(
        'Could not find ItemReserva with ' + key + ':' + value,
      );
    }

    return itemReserva;
  }
}
