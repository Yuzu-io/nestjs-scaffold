import {
  IsString,
  IsEmail,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { USER_SEX } from '../enums/user-sex.enum';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  userName: string;

  @IsString()
  account: string;

  @IsString()
  password: string;

  @IsEnum(USER_SEX)
  @Transform(({ value }) => parseInt(value))
  sex: USER_SEX;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(120)
  age: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  avatar: string;
}
