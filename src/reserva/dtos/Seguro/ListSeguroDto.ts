import { AutoMap } from '@automapper/classes';

export class ListSeguroDto {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  dailyPrice: number;
}
