import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'src/knex/knex.decorator';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import ms = require('ms');

@Injectable()
export class AuthService {
  constructor(
    @InjectKnex private readonly knex: Knex,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUserName(username);
    console.log('🚀 ~ AuthService ~ user:', user);

    if (!user)
      throw new BadRequestException(
        'The user with the given name does not exists',
      );

    if (password === user.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      console.log('🚀 ~ AuthService ~ validateUser ~ result:', result);
      return result;
    } else {
      throw new BadRequestException('The password does not match.');
    }
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
    console.log('🚀 ~ AuthService ~ login ~ accessToken:', accessToken);

    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: this.configService.get('jwt.jwtRefresh'),
      expiresIn: ms(30 * 24 * 60 * 60 * 1000),
    });
    console.log('🚀 ~ AuthService ~ login ~ refreshToken:', refreshToken);
    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
