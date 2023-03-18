import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const { account, password } = loginDto;
    const user = await this.userService.findByAccount(account);
    const hashedPassword = user.password;
    // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async validateUserById(id: string) {
    const user = await this.userService.findOneById(id);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const payload = { loginDto };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
