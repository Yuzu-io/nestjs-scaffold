import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {

  @Get()
  async findAll() {
    return
  }

  @Post()
  async create() {
    return
  }
}
