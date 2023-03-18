import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { comparePassword } from 'src/shared/utils/bcrypt';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'account',
      passwordField: 'password',
    });
  }

  async validate(account: string, password: string) {
    const user = await this.authService.validateUser(account);
    if (!user) {
      throw new BadRequestException('账号不存在！');
    }

    if (!comparePassword(password, user.password)) {
      throw new BadRequestException('密码错误！');
    }
    return user;
  }
}
