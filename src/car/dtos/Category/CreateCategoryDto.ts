import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @AutoMap()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @AutoMap()
  description: string;

  @ApiProperty()
  @IsNumber()
  @AutoMap()
  @Min(1)
  dailyPrice: number;
}
