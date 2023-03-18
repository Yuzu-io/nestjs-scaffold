import { USER_SEX } from './../enums/user-sex.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { USER_STATUS } from '../enums/user-status.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_name',
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

  @Exclude()
  @Column({
    length: 100,
    comment: '密码',
  })
  password: string;

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
    nullable: true,
    comment: '角色',
  })
  role: number;

  @Column({
    name: 'user_status',
    type: 'enum',
    enum: USER_STATUS,
    default: USER_STATUS.EFFICIENT,
    comment: '状态：1-有效|2-禁用',
  })
  userStatus: number;

  @Column({
    name: 'create_time',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '修改时间',
  })
  updateTime: Date;
}
