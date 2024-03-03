import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum LoginInType {
  User = 'USER',
  Admin = 'ADMIN',
}

export class LoginInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsEnum(LoginInType)
  @IsNotEmpty()
  @ApiProperty({
    enum: LoginInType,
    default: LoginInType.User,
  })
  loginType!: LoginInType;
}
