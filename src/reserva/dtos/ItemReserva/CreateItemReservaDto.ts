import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class CreateItemReservaDto {
  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  @Min(1)
  price: number;

  @AutoMap()
  @ApiProperty()
  dailyPriced: boolean;
}
