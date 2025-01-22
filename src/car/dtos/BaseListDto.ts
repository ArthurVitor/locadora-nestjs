import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class BaseListDto {
  @AutoMap()
  @ApiProperty()
  id: number;

  @AutoMap()
  @ApiProperty()
  name: string;
}
