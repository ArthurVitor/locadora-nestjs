import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOptionalDto {
  @ApiProperty()
  @IsString()
  @AutoMap()
  name: string;
}
