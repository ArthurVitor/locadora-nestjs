import { AutoMap } from '@automapper/classes';
import { Reserva } from '../../reserva/entities/Reserva.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Brand } from './Brand.entity';
import { Category } from './Category.entity';
import { Optionals } from './Optionals.entity';

@Entity({ name: 'cars' })
export class Car {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ unique: true })
  @AutoMap()
  plate: string;

  @ManyToOne(() => Brand, (brand) => brand.cars, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @AutoMap(() => Brand)
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.cars, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @AutoMap()
  category: Category;

  @Column()
  @AutoMap()
  model: string;

  @Column()
  @AutoMap()
  year: number;

  @ManyToMany(() => Optionals)
  @JoinTable({ name: 'car_optionals' })
  @AutoMap(() => Optionals)
  optionals: Optionals[];

  @OneToMany(() => Reserva, (reserva) => reserva.car)
  reservas: Reserva[];
}
