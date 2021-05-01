import { getFullName } from 'src/shared/helpers/name';
import { Entity, PrimaryGeneratedColumn, Column, Unique, Index } from 'typeorm';

@Entity()
@Index(['firstName', 'lastName'], { unique: true })
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  get fullName() {
    return getFullName(this);
  }

  // @ManyToMany(() => Actor, {
  //   onDelete: 'CASCADE',
  //   eager: true,
  // })
  // @JoinTable()
  // stars: Actor[];
}
