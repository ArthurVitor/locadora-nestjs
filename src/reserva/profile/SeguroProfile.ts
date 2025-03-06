import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreateSeguroDto } from '../dtos/Seguro/CreateSeguroDto';
import { Seguro } from '../entities/Seguro.entity';
import { ListSeguroDto } from '../dtos/Seguro/ListSeguroDto';

export class SeguroProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateSeguroDto, Seguro);
      createMap(mapper, Seguro, ListSeguroDto);
    };
  }
}
