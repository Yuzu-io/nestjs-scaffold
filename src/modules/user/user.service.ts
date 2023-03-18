import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword, hashPassword } from 'src/shared/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneById(id: string) {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByAccount(account: string) {
    return await this.userRepository.findOne({
      where: {
        account: account,
      },
    });
  }

  async register(createUserDto: CreateUserDto) {
    const existUser = await this.findByAccount(createUserDto.account);
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    // 加密
    const password = hashPassword(createUserDto.password);
    const user = await this.userRepository.create({
      ...createUserDto,
      password,
    });
    return await this.userRepository.save(user);
  }
}
