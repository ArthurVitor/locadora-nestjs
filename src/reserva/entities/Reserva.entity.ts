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
  periodo_retirada: Date;

  @Column({ type: 'date' })
  @AutoMap()
  periodo_devolucao: Date;

  @Column({ type: 'date' })
  @AutoMap()
  data_retirada: Date;

  @Column({ type: 'date' })
  @AutoMap()
  data_devolucao: Date;

  @AutoMap()
  valor_total: number;

  @ManyToOne(() => Car, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carro_id' })
  @AutoMap(() => Car)
  car: Car;
}
