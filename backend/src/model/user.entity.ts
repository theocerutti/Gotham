import {PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne} from 'typeorm';
import {WorkingTime} from "./workingtime.entity";
import {Clock} from "./clock.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false})
  username: string;

  @Column({unique: true, nullable: false})
  email: string;

  @OneToMany(() => WorkingTime, workingtime => workingtime.user, { onDelete: 'CASCADE' })
  workingtimes: WorkingTime[]

  @OneToOne(() => Clock, clock => clock.user,{ onDelete: 'CASCADE' })
  clock: Clock
}