import {Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user.entity";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, user => user.teams, {nullable: false, cascade: true})
  @JoinTable()
  users: User[]

  addUser(user: User) {
    if (!this.users)
      this.users = []
    if (this.users.some(_user => _user.id === user.id)) return
    this.users.push(user);
  }
}