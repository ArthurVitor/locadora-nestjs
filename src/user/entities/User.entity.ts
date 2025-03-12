import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './Address.entity';
import { AutoMap } from '@automapper/classes';
import { Role } from './Role.entity';
import { Reserva } from '../../reserva/entities/Reserva.entity';

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

  @OneToMany(() => Reserva, (reserva) => reserva.user, { cascade: true })
  @AutoMap(() => Reserva)
  reservas: Reserva[];
}
