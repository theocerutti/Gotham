import {Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user.entity";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, user => user.team, {nullable: false})
  user: User
}