import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import {WorkingTime} from "./workingtime.entity";
import {Clock} from "./clock.entity";
import {Team} from "./team.entity";
import {Role} from "../role/role.utils";
import * as bcrypt from "bcrypt";
import {Exclude} from "class-transformer";
import {IsNotEmpty, Length} from "class-validator";
import {ApiHideProperty} from "@nestjs/swagger";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false})
  @Length(4, 16)
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Exclude()
  @ApiHideProperty()
  @Length(4, 16)
  @Column({nullable: false})
  password: string;

  @Column({unique: true, nullable: false})
  email: string;

  @Column({nullable: false, default: Role.User})
  role: Role

  @ApiHideProperty()
  @OneToMany(() => WorkingTime, workingtime => workingtime.user, {onDelete: 'CASCADE'})
  workingtimes: WorkingTime[]

  @ApiHideProperty()
  @OneToOne(() => Clock, clock => clock.user, {onDelete: 'CASCADE'})
  clock: Clock

  @ApiHideProperty()
  @ManyToMany(() => Team, team => team.users)
  teams: Team[]

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    try {
      const saltRounds = bcrypt.getRounds(this.password);
      if (saltRounds === 0) {
        this.password = bcrypt.hashSync(this.password, 10);
      }
      const salt = bcrypt.genSaltSync(10)
      this.password = bcrypt.hashSync(this.password, salt);
    } catch (error) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}