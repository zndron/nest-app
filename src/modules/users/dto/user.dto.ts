import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}

export class CreateUserDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto extends UserDto {
  @IsString()
  @IsOptional()
  password: string;
}