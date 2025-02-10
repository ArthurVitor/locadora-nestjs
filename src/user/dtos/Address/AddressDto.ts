import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @AutoMap()
  @ApiProperty()
  street?: string;

  @AutoMap()
  @ApiProperty()
  number?: string;

  @AutoMap()
  complement?: string;

  @AutoMap()
  @ApiProperty()
  neighborhood?: string;

  @AutoMap()
  @ApiProperty()
  city?: string;

  @AutoMap()
  @ApiProperty()
  state?: string;
}
