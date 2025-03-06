import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaDto {
  @AutoMap()
  @ApiProperty({
    type: String,
    example: '2025-02-27',
  })
  retirada_agendada: string;

  @AutoMap()
  @ApiProperty({
    type: String,
    example: '2025-02-27',
  })
  devolucao_agendada: string;

  @ApiProperty()
  carro_id: number;

  @ApiProperty()
  seguro_id: number;

  @ApiProperty()
  itensReserva: string[];
}
