import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @AutoMap()
  @ApiProperty()
  name: string;
}
