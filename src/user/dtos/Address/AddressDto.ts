import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty()
  @AutoMap()
  street: string;

  @ApiProperty()
  @AutoMap()
  number: number;

  @ApiProperty()
  @AutoMap()
  complement: string;

  @ApiProperty()
  @AutoMap()
  neighborhood: string;

  @ApiProperty()
  @AutoMap()
  city: string;

  @ApiProperty()
  @AutoMap()
  state: string;
}
