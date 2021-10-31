import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user.entity";
import {ApiHideProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";

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
  @Exclude()
  @ApiHideProperty()
  user: User
}