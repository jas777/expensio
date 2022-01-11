import { IsNumber, IsPositive, IsString, IsUUID, MaxLength } from "class-validator";

export default class ExpenseDTO {

  @IsNumber()
  @IsPositive()
  value: number;

  @IsString()
  @MaxLength(1024)
  description?: string;

  @IsUUID()
  issuer: string;

}
