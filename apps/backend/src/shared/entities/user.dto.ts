import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  NotContains
} from "class-validator";

export default class UserDTO {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsAlphanumeric('en-US', {
    message: 'Username must be alphanumeric'
  })
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  @NotContains(' ', {
    message: 'Password should not contain spaces'
  })
  password: string;

}
