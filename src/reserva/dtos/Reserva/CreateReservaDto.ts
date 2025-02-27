import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaDto {
  @AutoMap()
  @ApiProperty({
    type: String,
    example: '2025-02-27',
  })
  periodo_retirada: string;

  @AutoMap()
  @ApiProperty({
    type: String,
    example: '2025-02-27',
  })
  periodo_devolucao: string;

  @ApiProperty()
  carro_id: number;
}
