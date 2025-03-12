import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckinDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  reservaId: number;
}
