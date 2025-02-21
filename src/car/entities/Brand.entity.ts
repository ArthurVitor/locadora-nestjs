import { AutoMap } from '@automapper/classes';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { Car } from './Car.entity';

@Entity({ name: 'brands' })
export class Brand {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @OneToMany(() => Car, (car) => car.brand)
  cars: Car[];
}
