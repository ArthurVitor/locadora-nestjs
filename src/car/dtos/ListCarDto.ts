import { AutoMap } from '@automapper/classes';
import { CarBrandsEnum } from '../enums/CarBrandEnum';
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
  category: string;

  @AutoMap()
  isAvailable: boolean;
}
