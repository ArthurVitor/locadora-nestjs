import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Car } from '../entities/Car.entity';
import { CreateCarDto } from '../dtos/Car/CreateCarDto';
import { ListCarDto } from '../dtos/Car/ListCarDto';

export class CarProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateCarDto, Car);
      createMap(mapper, Car, ListCarDto);
    };
  }
}
