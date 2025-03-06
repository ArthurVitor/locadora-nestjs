import { AutoMap } from '@automapper/classes';

export class ListItemReservaDto {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  price: number;

  @AutoMap()
  dailyPriced: boolean;
}
