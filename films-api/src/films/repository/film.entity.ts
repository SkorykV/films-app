import { Actor } from 'src/actors/repository/actor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm';
import { FILM_FORMAT } from '../types/film-format.enum';

@Entity()
export class Film extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  releaseYear: number;

  @Column({
    type: 'enum',
    enum: FILM_FORMAT,
  })
  format: FILM_FORMAT;

  @ManyToMany(() => Actor, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  stars: Actor[];
}
