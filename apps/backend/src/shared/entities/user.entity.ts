import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsAlphanumeric, IsEmail, IsUUID } from 'class-validator';
import { User } from '../users/User';
import ExpenseEntity from "./expense.entity";

@Entity('users')
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column('varchar', { length: 256 })
  @IsEmail()
  email: string;

  @Column('varchar', { length: 64 })
  @IsAlphanumeric()
  username: string;

  @Column('varchar', { length: 256 })
  password: string;

  @OneToMany(() => ExpenseEntity, (expense) => expense.issuer)
  expenses: ExpenseEntity[];

  toResponseObject(showPassword = false): Partial<User> {
    const { id, email, username, password } = this;

    const returnObj: Partial<User> = {
      id,
      email,
      username,
    };

    if (showPassword) {
      returnObj.password = password;
    }

    return returnObj;
  }
}
