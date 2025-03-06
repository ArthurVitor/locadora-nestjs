import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreateReservaDto } from '../dtos/Reserva/CreateReservaDto';
import { Reserva } from '../entities/Reserva.entity';
import { ListReservaDto } from '../dtos/Reserva/ListReservaDto';

export class ReservaProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateReservaDto, Reserva);
      createMap(mapper, Reserva, ListReservaDto);
    };
  }
}
