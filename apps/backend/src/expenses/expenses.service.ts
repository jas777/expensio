import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ExpenseDTO from '../shared/entities/expense.dto';
import { Repository } from 'typeorm';
import ExpenseEntity from '../shared/entities/expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '../shared/entities/user.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private expensesRepository: Repository<ExpenseEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async createExpense(authUser: string, dto: ExpenseDTO) {
    const user = await this.usersRepository.findOne(authUser);

    if (!user) {
      throw new HttpException(
        {
          message: `Invalid user '${authUser}'!`,
          timestamp: Date.now().toString(),
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const expense = this.expensesRepository.create({
      ...dto,
      deleted: false,
      issuer: user,
    });

    await this.expensesRepository.save(expense);
    return expense.toResponseObject();
  }

  async updateExpense(id: string, authUser: string, data: Partial<ExpenseDTO>) {
    const expense = await this.checkExpenseOwner(id, authUser);

    if (expense.deleted) {
      throw new HttpException(
        {
          message: `Invalid expense '${id}'!`,
          timestamp: Date.now().toString(),
        },
        HttpStatus.GONE
      );
    }

    await this.expensesRepository.update(expense.id, data);
    return (
      await this.expensesRepository.findOne(expense.id)
    ).toResponseObject();
  }

  async deleteExpense(id: string, authUser: string) {
    const expense = await this.checkExpenseOwner(id, authUser);

    if (expense.deleted) {
      throw new HttpException(
        {
          message: `Invalid expense '${id}'!`,
          timestamp: Date.now().toString(),
        },
        HttpStatus.GONE
      );
    }

    await this.expensesRepository.update(id, { deleted: true });
    return 'OK';
  }

  async checkExpenseOwner(id: string, authUser: string) {
    const expense = await this.expensesRepository.findOne(id, {
      relations: ['issuer'],
    });

    if (!expense) {
      throw new HttpException(
        {
          message: `Invalid expense'${id}'!`,
          timestamp: Date.now().toString(),
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const user = expense.issuer;

    if (user.id !== authUser) {
      throw new HttpException(
        {
          message: 'You are not the owner of this expense!',
          timestamp: Date.now().toString(),
        },
        HttpStatus.FORBIDDEN
      );
    }

    return expense;
  }

}
