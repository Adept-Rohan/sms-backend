import { User } from 'src/user/entities/user.entity';

export class LoginRes {
  user!: Omit<User, 'password'>;
  accessToken!: string;
  refreshToken!: string;
  message!: string;
}
