import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @AutoMap()
  @Column()
  street?: string;

  @AutoMap()
  @Column()
  number?: string;

  @AutoMap()
  @Column({ nullable: true })
  complement?: string;

  @AutoMap()
  @Column()
  neighborhood?: string;

  @AutoMap()
  @Column()
  city?: string;

  @AutoMap()
  @Column()
  state?: string;
}
