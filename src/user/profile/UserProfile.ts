import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { AddressDto } from '../dtos/Address/AddressDto';
import { UpdateAddressDto } from '../dtos/Address/UpdateAddressDto';
import { CreateUserDto } from '../dtos/User/CreateUserDto';
import { ListUserDto } from '../dtos/User/ListUserDto';
import { UpdateUserDto } from '../dtos/User/UpdateUserDto';
import { Address } from '../entities/Address.entity';
import { User } from '../entities/User.entity';

export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateUserDto, User);
      createMap(mapper, User, ListUserDto);
      createMap(mapper, UpdateUserDto, User);
      createMap(mapper, ListUserDto, User);

      createMap(mapper, Address, AddressDto);
      createMap(mapper, AddressDto, Address);
      createMap(mapper, UpdateAddressDto, Address);
    };
  }
}
