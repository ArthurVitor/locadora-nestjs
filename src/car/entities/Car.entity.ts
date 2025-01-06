import { AutoMap } from '@automapper/classes';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { CarBrandsEnum } from '../enums/CarBrandEnum';
import { CarOptionalsEnum } from '../enums/CarOptionalEnum';

@Entity()
export class Car {
  @ObjectIdColumn()
  @AutoMap()
  id: ObjectId;

  @Column({ unique: true })
  @AutoMap()
  plate: string;

  @Column()
  @AutoMap()
  brand: CarBrandsEnum;

  @Column()
  @AutoMap()
  model: string;

  @Column()
  @AutoMap()
  year: number;

  @Column()
  @AutoMap()
  optionals: CarOptionalsEnum[];

  @Column()
  @AutoMap()
  category: string;
}
