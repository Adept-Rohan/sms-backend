import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response as ExpResponse } from 'express';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginInput } from './dto/login-input';
import { LoginRes } from './entities/login-res.entity';
import * as dayjs from 'dayjs';
import { IsPulic } from './public.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPulic()
  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginInput })
  @ApiResponse({ type: LoginRes })
  async login(@Body() loginInput: LoginInput, @Res() res: ExpResponse) {
    const user = await this.authService.validateUser(
      loginInput.username,
      loginInput.password,
    );
    console.log('🚀 ~ AuthController ~ login ~ user:', user);

    if (!user) throw new UnauthorizedException('The user does not exists.');

    const { refreshToken, ...userData } = await this.authService.login(
      user as never,
    );

    res.cookie('rt', refreshToken, {
      httpOnly: true,
      expires: dayjs().add(30, 'days').toDate(),
    });

    console.log({
      userData,
      refreshToken,
      message: 'Logged In Succesfully !',
    });

    res.json({
      userData,
      refreshToken,
      message: 'Logged In Succesfully !',
    });

    // return {
    //   userData,
    //   refreshToken,
    //   message: 'Logged In Succesfully !',
    // };
  }
}
