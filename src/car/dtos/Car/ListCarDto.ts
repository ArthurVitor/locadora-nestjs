import { AutoMap } from '@automapper/classes';
import { ListOptionalDto } from '../Optional/ListOptionalDto';
import { ListCategoryDto } from '../Category/ListOptionalDto';
import { ListBrandDto } from '../Brand/ListBrandDto';

export class ListCarDto {
  @AutoMap()
  id: string;

  @AutoMap()
  plate: string;

  @AutoMap(() => ListBrandDto)
  brand: ListBrandDto;

  @AutoMap()
  model: string;

  @AutoMap()
  year: number;

  @AutoMap(() => ListOptionalDto)
  optionals: ListOptionalDto[];

  @AutoMap(() => ListCategoryDto)
  category: ListCategoryDto;

  @AutoMap()
  isAvailable: boolean;
}
