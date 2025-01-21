import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreateOptionalDto } from '../dtos/Optional/CreateOptionalDto';
import { Optionals } from '../entities/Optionals.entity';
import { ListOptionalDto } from '../dtos/Optional/ListOptionalDto';

export class OptionalProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateOptionalDto, Optionals);
      createMap(mapper, Optionals, ListOptionalDto);
    };
  }
}
