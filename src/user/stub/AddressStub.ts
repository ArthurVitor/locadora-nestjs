import { AddressDto } from '../dtos/Address/AddressDto';
import { Address } from '../entities/Address.entity';

export class AddressStub {
  static getValidAddress(): Address {
    return {
      id: 1,
      street: 'Rua das Flores',
      number: '123',
      complement: 'Casa',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
    };
  }

  static getValidAddressDto(): AddressDto {
    return {
      id: 1,
      street: 'Rua das Flores',
      number: '123',
      complement: 'Casa',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
    };
  }
}
