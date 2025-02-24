import { AutoMap } from '@automapper/classes';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './Car.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @AutoMap()
  @Column({ unique: true })
  name: string;

  @AutoMap()
  @Column()
  description: string;

  @AutoMap()
  @Column()
  dailyPrice: number;

  @OneToMany(() => Car, (car) => car.brand)
  cars: Car[];
}
