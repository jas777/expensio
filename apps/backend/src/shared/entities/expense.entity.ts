import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserEntity from './user.entity';

@Entity('expenses')
export default class ExpenseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;

  @Column('int')
  value: number;

  @Column('varchar', { nullable: true, length: 1024 })
  description?: string;

  @ManyToOne(() => UserEntity, (user) => user.expenses, { cascade: false, nullable: true })
  issuer: UserEntity;

  @Column('boolean')
  deleted: boolean;

  toResponseObject() {
    let mappedIssuer: string;

    if (this.issuer) {
      mappedIssuer = this.issuer.id;
    }

    return {
      ...this,
      issuer: mappedIssuer,
    };
  }
}
