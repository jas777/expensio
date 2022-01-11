import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";
import { ExpensesService } from './expenses.service';
import { User } from '../shared/users/user.decorator';
import { JwtAuthGuard } from '../shared/auth/JwtAuthGuard';
import ExpenseDTO from '../shared/entities/expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createExpense(@User('id') authUser: string, @Body() data: ExpenseDTO) {
    return await this.expensesService.createExpense(authUser, data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateExpense(
    @Param('id') id: string,
    @User('id') authUser: string,
    @Body() data: Partial<ExpenseDTO>
  ) {
    return await this.expensesService.updateExpense(id, authUser, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteExpense(@Param('id') id: string, @User('id') authUser: string) {
    return await this.expensesService.deleteExpense(id, authUser);
  }
}
