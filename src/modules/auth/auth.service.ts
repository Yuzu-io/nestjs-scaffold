import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/shared/utils/bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(account: string) {
    const user = await this.userService.findByAccount(account);
    if (user) {
      return user;
    }
    return null;
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
    const user = await this.validateUser(loginDto.account);
    const payload: JwtPayload = {
      sub: user.id,
    };
    const accessToken = this.jwtService.sign(payload);
    console.log(accessToken);

    return { accessToken };
  }
}
