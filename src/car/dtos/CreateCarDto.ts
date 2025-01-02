import { AutoMap } from '@automapper/classes';
import { CarBrandsEnum } from '../enums/CarBrandEnum';
import { CarCategoryEnum } from '../enums/CarCategoryEnum';
import { CarOptionalsEnum } from '../enums/CarOptionalEnum';
import { IsArray, IsIn, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @AutoMap()
  @IsString()
  @ApiProperty()
  plate: string;

  @AutoMap()
  @IsIn(Object.keys(CarBrandsEnum))
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
  @IsIn(Object.keys(CarOptionalsEnum), { each: true })
  @ApiProperty()
  optionals: string[];

  @AutoMap()
  @IsIn(Object.keys(CarCategoryEnum))
  @ApiProperty()
  category: string;
}
