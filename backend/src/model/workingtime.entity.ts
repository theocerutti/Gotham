import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user.entity";

@Entity()
export class WorkingTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  start: Date;

  @Column({nullable: false})
  end: Date;

  @Column()
  description: string;

  @ManyToOne(() => User, user => user.workingtimes, {nullable: false, onDelete: 'CASCADE'})
  user: User
}