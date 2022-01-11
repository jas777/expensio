import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export default class ExpenseDTO {
  @IsNumber()
  @IsPositive()
  value: number;

  @IsString()
  @MaxLength(1024)
  @IsOptional()
  description?: string;
}
