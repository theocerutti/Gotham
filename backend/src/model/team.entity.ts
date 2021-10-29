import {Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user.entity";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, user => user.teams, {nullable: false})
  @JoinTable()
  users: User[]
}