import { ApiProperty } from '@nestjs/swagger';

export class UserToken {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  userToken!: string;
}
