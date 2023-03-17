import { USER_SEX } from './../enums/user-sex.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, default: '用户' })
  userName: string;

  @Column({ length: 36, unique: true })
  account: string;

  @Column({ length: 100 })
  password: string;

  @Column({
    type: 'enum',
    enum: USER_SEX,
    default: USER_SEX.UNKNOWN,
  })
  sex: USER_SEX;

  @Column({ nullable: true })
  age: number;

  @Column({
    length: 50,
    unique: true,
  })
  email: string;

  @Column({ length: 11, nullable: true })
  phone: string;

  @Column({ length: 100, nullable: true })
  avatar: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;
}
