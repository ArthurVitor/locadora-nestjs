import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaDto {
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

  @ApiProperty()
  carro_id: number;
}
