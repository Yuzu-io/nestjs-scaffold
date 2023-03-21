import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
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
}
