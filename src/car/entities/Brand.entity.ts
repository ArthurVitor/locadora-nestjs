import { AutoMap } from '@automapper/classes';
import { Car } from 'src/car/entities/Car.entity';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';

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
