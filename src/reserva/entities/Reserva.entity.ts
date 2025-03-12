import { AutoMap } from '@automapper/classes';
import { Car } from 'src/car/entities/Car.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seguro } from './Seguro.entity';
import { ItemReserva } from './ItemReserva.entity';
import { User } from '../../user/entities/User.entity';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ type: 'date' })
  @AutoMap()
  retirada_agendada: Date;

  @Column({ type: 'date' })
  @AutoMap()
  devolucao_agendada: Date;

  @Column({ type: 'date', nullable: true })
  @AutoMap()
  data_retirada: Date;

  @Column({ type: 'date', nullable: true })
  @AutoMap()
  data_devolucao: Date;

  @AutoMap()
  @Column({ nullable: true })
  valor_total: number;

  @AutoMap()
  @Column()
  inProgess: boolean = false;

  @ManyToOne(() => Car, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carro_id' })
  @AutoMap(() => Car)
  car: Car;

  @ManyToOne(() => Seguro, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'seguro_id' })
  @AutoMap(() => Seguro)
  seguro: Seguro;

  @ManyToMany(() => ItemReserva, { cascade: true })
  @JoinTable({ name: 'reserva_items' })
  @AutoMap(() => ItemReserva)
  items: ItemReserva[];

  @ManyToOne(() => User, (user) => user.reservas, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  @AutoMap(() => User)
  user: User;
}
