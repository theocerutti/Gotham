import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {WorkingTime} from "./workingtime.entity";
import {Clock} from "./clock.entity";
import {Team} from "./team.entity";
import {Role} from "../role/role.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false})
  username: string;

  @Column({unique: true, nullable: false})
  email: string;

  @Column({nullable: false, default: Role.User})
  role: Role

  @OneToMany(() => WorkingTime, workingtime => workingtime.user, {onDelete: 'CASCADE'})
  workingtimes: WorkingTime[]

  @OneToOne(() => Clock, clock => clock.user, {onDelete: 'CASCADE'})
  clock: Clock

  @ManyToOne(() => Team, team => team.user)
  team: Team
}