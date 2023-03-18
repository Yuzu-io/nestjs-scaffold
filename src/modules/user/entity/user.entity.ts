import { USER_SEX } from './../enums/user-sex.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'id',
  })
  id: string;

  @Column({
    length: 50,
    default: '用户',
    comment: '用户名',
  })
  userName: string;

  @Column({
    length: 36,
    unique: true,
    comment: '账号',
  })
  account: string;

  @Column({
    length: 100,
    comment: '密码',
  })
  password: string;

  @Column({
    length: 6,
    comment: '密码盐',
  })
  passwordSalt: string;

  @Column({
    type: 'enum',
    enum: USER_SEX,
    default: USER_SEX.UNKNOWN,
    comment: '性别',
  })
  sex: USER_SEX;

  @Column({
    nullable: true,
    comment: '年龄',
  })
  age: number;

  @Column({
    length: 50,
    nullable: true,
    unique: true,
    comment: '邮箱',
  })
  email: string;

  @Column({
    length: 11,
    nullable: true,
    comment: '手机号',
  })
  phone: string;

  @Column({
    length: 100,
    nullable: true,
    comment: '头像',
  })
  avatar: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  createTime: Date;
}
