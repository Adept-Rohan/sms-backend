import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'src/knex/knex.decorator';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    @InjectKnex private readonly knex: Knex,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(
    username: string,
    password: string,
    loginType: 'USER' | 'ADMIN' = 'USER',
  ) {
    // const user = this.userService.findByUserName(username);

    const user = await (loginType === 'ADMIN'
      ? //   ? this.adminService.findByUsername(username, 'email')
        null
      : this.userService.findByUserName(username));

    if (!user)
      throw new BadRequestException(
        'The user with the given name does not exists',
      );

    if (user && bcrypt.compareSync(password, user?.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
    };

    const refreshPayload = {
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.jwtSecret'),
      expiresIn: ms(1 * 24 * 60 * 60 * 1000),
    });

    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: this.configService.get('jwt.jwtRefresh'),
      expiresIn: ms(1 * 24 * 60 * 60 * 1000),
    });
    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
