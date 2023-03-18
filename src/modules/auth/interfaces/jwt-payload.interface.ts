export interface JwtPayload {
  sub: string; //JWT的主题，即用户的唯一标识符
  username: string; // JWT中包含的用户名
  iat?: number; // JWT的签发时间，使用UNIX时间戳表示
  exp?: number; // JWT的过期时间，使用UNIX时间戳表示
}
