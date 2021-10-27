import {PrimaryGeneratedColumn, Column, Entity, ManyToOne} from 'typeorm';
import {User} from "./user.entity";

@Entity()
export class WorkingTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  start: Date;

  @Column({nullable: false})
  end: Date;

  @ManyToOne(() => User, user => user.workingtimes, { nullable: false })
  user: User
}