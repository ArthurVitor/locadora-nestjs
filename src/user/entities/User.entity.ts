import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { Address } from './Address.entity';
import { AutoMap } from '@automapper/classes';

@Entity('users')
export class User {
  @ObjectIdColumn()
  @AutoMap()
  id: ObjectId;

  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  email: string;

  @Column()
  @AutoMap()
  password: string;

  @Column()
  @AutoMap()
  cpf: string;

  @Column()
  @AutoMap()
  birthDate: Date;

  @Column()
  @AutoMap()
  cellPhone: string;

  @Column()
  @AutoMap(() => Address)
  address: Address;
}
