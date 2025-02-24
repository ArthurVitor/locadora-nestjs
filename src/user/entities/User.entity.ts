import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './Address.entity';
import { AutoMap } from '@automapper/classes';
import { Role } from './Role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @Column({ unique: true })
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

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable({ name: 'users_role' })
  roles: Role[];

  @OneToOne(() => Address, { cascade: true })
  @AutoMap(() => Address)
  address: Address;
}
