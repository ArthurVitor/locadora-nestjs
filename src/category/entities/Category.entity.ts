import { AutoMap } from '@automapper/classes';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Category {
  @ObjectIdColumn()
  @AutoMap()
  id: ObjectId;

  @AutoMap()
  @Column({ unique: true })
  name: string;

  @AutoMap()
  @Column()
  description: string;

  @AutoMap()
  @Column()
  dailyPrice: number;
}
