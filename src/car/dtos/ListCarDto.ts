import { AutoMap } from '@automapper/classes';
import { CarBrandsEnum } from '../enums/CarBrandEnum';
import { CarCategoryEnum } from '../enums/CarCategoryEnum';
import { CarOptionalsEnum } from '../enums/CarOptionalEnum';

export class ListCarDto {
  @AutoMap()
  id: string;

  @AutoMap()
  plate: string;

  @AutoMap()
  brand: CarBrandsEnum;

  @AutoMap()
  model: string;

  @AutoMap()
  year: number;

  @AutoMap()
  optionals: CarOptionalsEnum[];

  @AutoMap()
  category: CarCategoryEnum;
}
