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
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '用户名',
    type: 'string',
    example: 'string',
  })
  @IsOptional()
  @IsString()
  userName: string;

  @ApiProperty({
    description: '账号',
    type: 'string',
    example: 'string',
    required: true,
  })
  @IsString()
  account: string;

  @ApiProperty({
    description: '密码',
    type: 'string',
    example: 'string',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: '性别',
    type: 'string',
    example: 'string',
  })
  @IsOptional()
  @IsEnum(USER_SEX)
  @Transform(({ value }) => String(value))
  sex: USER_SEX;

  @ApiProperty({
    description: '年龄',
    type: 'number',
    example: 'number',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(120)
  age: number;

  @ApiProperty({
    description: '邮箱',
    type: 'string',
    example: 'string',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '手机号',
    type: 'string',
    example: 'string',
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({
    description: '头像',
    type: 'string',
    example: 'http://www.yuzuchan.top:9100/test/face.png',
  })
  @IsOptional()
  avatar: string;
}
