import { AutoMap } from '@automapper/classes';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './Car.entity';

@Entity({ name: 'optionals' })
export class Optionals {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @ManyToMany(() => Car, (car) => car.optionals)
  cars: Car[];
}
