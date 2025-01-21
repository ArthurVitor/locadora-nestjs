import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Optionals } from './Optionals.entity';
import { Brand } from 'src/car/entities/Brand.entity';
import { Category } from './Category.entity';

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

  @Column()
  @AutoMap()
  isAvailable: boolean = true;
}
