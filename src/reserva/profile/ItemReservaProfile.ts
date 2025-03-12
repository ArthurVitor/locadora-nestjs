import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreateItemReservaDto } from '../dtos/ItemReserva/CreateItemReservaDto';
import { ItemReserva } from '../entities/ItemReserva.entity';
import { ListItemReservaDto } from '../dtos/ItemReserva/ListItemReservaDto';

export class ItemReservaProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateItemReservaDto, ItemReserva);
      createMap(mapper, ItemReserva, ListItemReservaDto);
    };
  }
}
