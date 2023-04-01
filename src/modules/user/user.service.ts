import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/shared/utils/bcrypt';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { CreateUserDto } from './dto/create-user.dto';
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
    return await this.userRepository
      .createQueryBuilder()
      .where('id=:id', { id })
      .getOne();
  }

  async findByAccount(account: string) {
    return await this.userRepository
      .createQueryBuilder()
      .where('account=:account', { account })
      .getOne();
  }

  async findByEmail(email: string) {
    return await this.userRepository
      .createQueryBuilder()
      .where('email=:email', { email })
      .getOne();
  }

  @Transactional()
  async register(createUserDto: CreateUserDto) {
    const existUser = await this.findByAccount(createUserDto.account);
    const existEmail = await this.findByEmail(createUserDto.email);

    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    if (existEmail) {
      throw new HttpException('邮箱已存在', HttpStatus.BAD_REQUEST);
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
