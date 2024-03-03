import { Transform } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Unique username',
  })
  username!: string;

  @IsString()
  @Transform(({ value }) => bcrypt.hashSync(value, 12))
  password: string;

  @IsEnum(UserRole)
  @ApiProperty({
    enum: UserRole,
    example: UserRole.User,
  })
  role!: UserRole;
}
