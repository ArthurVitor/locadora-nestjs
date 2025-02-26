import { AutoMap } from '@automapper/classes';
import { ListCarDto } from '../../../car/dtos/Car/ListCarDto';
import { ApiProperty } from '@nestjs/swagger';

export class ListReservaDto {
  @AutoMap()
  @ApiProperty()
  id: number;

  @AutoMap()
  @ApiProperty()
  periodo_retirada: Date;

  @AutoMap()
  @ApiProperty()
  periodo_devolucao: Date;

  @AutoMap()
  @ApiProperty()
  data_retirada: Date;

  @AutoMap()
  @ApiProperty()
  data_devolucao: Date;

  @AutoMap()
  @ApiProperty()
  valor_total: number;

  @AutoMap(() => ListCarDto)
  @ApiProperty()
  car: ListCarDto;
}
