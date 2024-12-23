import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { AddressDto } from 'src/user/dtos/Address/AddressDto';
import { CreateUserDto } from 'src/user/dtos/User/CreateUserDto';
import { Address } from 'src/user/entities/Address.entity';
import { User } from 'src/user/entities/User.entity';
import { ListUserDto } from '../dtos/User/ListUserDto';
import { UpdateUserDto } from '../dtos/User/UpdateUserDto';
import { UpdateAddressDto } from '../dtos/Address/UpdateAddressDto';

export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateUserDto, User);
      createMap(
        mapper,
        User,
        ListUserDto,
        forMember(
          (dest) => dest.id,
          mapFrom((src) => src.id.toString()),
        ),
      );
      createMap(mapper, UpdateUserDto, User);
      createMap(mapper, ListUserDto, User);

      createMap(mapper, Address, AddressDto);
      createMap(mapper, AddressDto, Address);
      createMap(mapper, UpdateAddressDto, Address);
    };
  }
}
