import { Injectable } from '@nestjs/common';
import { ItemReservaRepository } from './repositories/itemReserva.repository';
import { Mapper } from '@automapper/core';
import { CreateItemReservaDto } from './dtos/ItemReserva/CreateItemReservaDto';
import { ItemReserva } from './entities/ItemReserva.entity';
import { InjectMapper } from '@automapper/nestjs';
import { ListItemReservaDto } from './dtos/ItemReserva/ListItemReservaDto';

@Injectable()
export class ItemReservaService {
  constructor(
    private itemReservaRepository: ItemReservaRepository,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(dto: CreateItemReservaDto) {
    const entity = this.mapper.map(dto, CreateItemReservaDto, ItemReserva);

    return this.mapper.map(
      await this.itemReservaRepository.save(entity),
      ItemReserva,
      ListItemReservaDto,
    );
  }
}
