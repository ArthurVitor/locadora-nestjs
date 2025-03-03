import { AutoMap } from '@automapper/classes';
import { Car } from 'src/car/entities/Car.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ type: 'date' })
  @AutoMap()
  retirada_agendada: Date; // retirada_agendada

  @Column({ type: 'date' }) // devolucao_agendada
  @AutoMap()
  devolucao_agendada: Date;

  @Column({ type: 'date', nullable: true })
  @AutoMap()
  data_retirada: Date;

  @Column({ type: 'date', nullable: true })
  @AutoMap()
  data_devolucao: Date;

  @AutoMap()
  valor_total: number;

  @ManyToOne(() => Car, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carro_id' })
  @AutoMap(() => Car)
  car: Car;
}
