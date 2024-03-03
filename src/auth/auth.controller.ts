import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginInput } from './dto/login-input';
import { LoginRes } from './entities/login-res.entity';
import ms from 'ms';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginInput })
  @ApiResponse({ type: LoginRes })
  async login(@Body() loginInput: LoginInput, @Res() res: Response) {
    const user = await this.authService.validateUser(
      loginInput.username,
      loginInput.password,
      loginInput.loginType,
    );
    console.log('🚀 ~ AuthController ~ login ~ user:', user);

    const { refreshToken, ...userData } = await this.authService.login(
      user as never,
    );

    res.cookie('rt', refreshToken, {
      httpOnly: true,
      expires: ms(1 * 30 * 24 * 60 * 60 * 1000),
    });

    return {
      userData,
      refreshToken,
      message: 'Logged In Succesfully !',
    };
  }
}
