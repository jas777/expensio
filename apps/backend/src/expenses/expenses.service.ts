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

  async createExpense(dto: ExpenseDTO) {
    const user = await this.usersRepository.findOne(dto.issuer);

    if (!user) {
      throw new HttpException(
        {
          message: `Invalid user '${dto.issuer}'!`,
          code: 'EXP001',
          timestamp: Date.now().toString(),
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const expense = this.expensesRepository.create({
      ...dto,
      issuer: user,
    });

    await this.expensesRepository.save(expense);
    return expense.toResponseObject();
  }
}
