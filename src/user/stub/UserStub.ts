import { CreateUserDto } from '../dtos/User/CreateUserDto';
import { ListUserDto } from '../dtos/User/ListUserDto';
import { Role } from '../entities/Role.entity';
import { User } from '../entities/User.entity';
import { AddressStub } from './AddressStub';

export class UserStub {
  static getValidUser(roles: Role[] = []): User {
    return {
      id: 1,
      password: 'string',
      birthDate: new Date('2006-08-14'),
      email: 'arthur@email.com',
      cellPhone: '12214545',
      cpf: '123456789',
      name: 'Arthur',
      address: AddressStub.getValidAddress(),
      roles: roles,
    };
  }

  static getValidCreateUserDto(): CreateUserDto {
    return {
      password: 'string',
      birthDate: new Date('2006-08-14'),
      email: 'arthur@email.com',
      cellPhone: '12214545',
      cpf: '123456789',
      name: 'Arthur',
      address: AddressStub.getValidAddressDto(),
    };
  }

  static getValidListUserDto(): ListUserDto {
    return {
      id: 1,
      password: 'string',
      birthDate: new Date('2006-08-14'),
      email: 'arthur@email.com',
      cellPhone: '12214545',
      cpf: '123456789',
      name: 'Arthur',
      address: AddressStub.getValidAddressDto(),
    };
  }
}
