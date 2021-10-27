import {PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne} from 'typeorm';
import {WorkingTime} from "./workingtime.entity";
import {Clock} from "./clock.entity";

@Entity()
export abstract class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true, nullable: false})
  username: string;

  @Column({unique: true, nullable: false})
  email: string;

  @OneToMany(() => WorkingTime, workingtime => workingtime.user)
  workingtimes: WorkingTime[]

  @OneToOne(() => Clock, clock => clock.user)
  clock: Clock
}