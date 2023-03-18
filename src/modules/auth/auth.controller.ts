import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('register')
  // async register(@Body() registerDto: RegisterDto) {
  //   const { id, username } = await this.authService.register(registerDto);
  //   return { id, username };
  // }

  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new HttpException('账号或密码错误', HttpStatus.UNAUTHORIZED);
    }
    const { accessToken } = await this.authService.login(loginDto);
    return { accessToken };
  }
}
