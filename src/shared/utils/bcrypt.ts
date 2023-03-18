import { compareSync, hashSync } from 'bcrypt';
/**
 * 加密 password
 * @param password 密码
 */
export function hashPassword(password: string) {
  return hashSync(password, 10);
}

/**
 * 比较
 * @param p1 客户端传递的密码
 * @param p2 数据库中的密码
 * @returns
 */
export function comparePassword(p1: string, p2: string) {
  return compareSync(p1, p2);
}
