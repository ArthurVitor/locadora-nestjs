import { ListOptionalDto } from '../dtos/Optional/ListOptionalDto';
import { Optionals } from '../entities/Optionals.entity';

export class OptionalsStub {
  static getValidOptionals(): Optionals {
    return {
      id: 1,
      name: 'Airbag',
      cars: [],
    };
  }

  static getValidOptionalsDto(): ListOptionalDto {
    return {
      id: 1,
      name: 'Airbag',
    };
  }
}
