import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async create(createUserDto: CreateUserDto) {
    const user = new UserEntity();
    user.account = createUserDto.account;
    user.password = createUserDto.password;

    return await this.userRepository.save(user);
  }

  async findByAccount(userName: string) {
    return await this.userRepository.findOne({
      where: {
        userName: userName,
      },
    });
  }
}
