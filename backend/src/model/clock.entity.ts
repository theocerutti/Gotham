import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user.entity";

@Entity()
export class Clock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  time: Date;

  @Column({default: true, nullable: false})
  status: boolean;

  @OneToOne(() => User, user => user.clock, {nullable: false, onDelete: 'CASCADE'})
  @JoinColumn()
  user: User
}