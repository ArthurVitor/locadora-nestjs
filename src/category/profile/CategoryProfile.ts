import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreateCategoryDto } from '../dtos/CreateCategoryDto';
import { Category } from '../entities/Category.entity';

export class CategoryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateCategoryDto, Category);
    };
  }
}
