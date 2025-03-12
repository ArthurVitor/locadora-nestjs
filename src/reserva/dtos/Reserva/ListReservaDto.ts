import { AutoMap } from '@automapper/classes';
import { ListCarDto } from '../../../car/dtos/Car/ListCarDto';
import { ApiProperty } from '@nestjs/swagger';
import { ListSeguroDto } from '../Seguro/ListSeguroDto';
import { ListItemReservaDto } from '../ItemReserva/ListItemReservaDto';

export class ListReservaDto {
  @AutoMap()
  @ApiProperty()
  id: number;

  @AutoMap()
  @ApiProperty()
  retirada_agendada: Date;

  @AutoMap()
  @ApiProperty()
  devolucao_agendada: Date;

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

  @AutoMap(() => ListSeguroDto)
  @ApiProperty()
  seguro: ListSeguroDto;

  @AutoMap()
  @ApiProperty()
  inProgess: boolean;

  @AutoMap(() => ListItemReservaDto)
  @ApiProperty()
  items: ListItemReservaDto[];
}
