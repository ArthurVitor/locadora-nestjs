import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreateBrandDto } from '../dtos/Brand/CreateBrandDto';
import { Brand } from '../entities/Brand.entity';
import { ListBrandDto } from '../dtos/Brand/ListBrandDto';

export class BrandProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateBrandDto, Brand);
      createMap(mapper, Brand, ListBrandDto);
    };
  }
}
