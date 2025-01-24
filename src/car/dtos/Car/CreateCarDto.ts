import { AutoMap } from '@automapper/classes';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @AutoMap()
  @IsString()
  @ApiProperty()
  plate: string;

  @AutoMap()
  @ApiProperty()
  brand: string;

  @AutoMap()
  @IsString()
  @ApiProperty()
  model: string;

  @AutoMap()
  @IsNumber()
  @ApiProperty()
  year: number;

  @AutoMap()
  @IsArray()
  @ApiProperty()
  optionals: string[];

  @AutoMap()
  @IsString()
  @ApiProperty()
  category: string;
}
