import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from '../Address/AddressDto';

export class CreateUserDto {
  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap()
  email: string;

  @ApiProperty()
  @AutoMap()
  password: string;

  @ApiProperty()
  @AutoMap()
  cpf: string;

  @ApiProperty()
  @AutoMap()
  birthDate: Date;

  @ApiProperty()
  @AutoMap()
  cellPhone: string;

  @ApiProperty()
  @AutoMap(() => AddressDto)
  address: AddressDto;
}
