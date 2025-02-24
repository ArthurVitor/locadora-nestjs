import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreateCategoryDto } from '../dtos/Category/CreateCategoryDto';
import { Category } from '../entities/Category.entity';
import { ListCategoryDto } from '../dtos/Category/ListOptionalDto';

export class CategoryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateCategoryDto, Category);
      createMap(mapper, Category, ListCategoryDto);
    };
  }
}
