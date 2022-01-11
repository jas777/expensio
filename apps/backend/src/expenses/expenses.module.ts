import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "../shared/entities/user.entity";
import ExpenseEntity from "../shared/entities/expense.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ExpenseEntity])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
