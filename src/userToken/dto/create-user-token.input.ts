import { ApiProperty } from '@nestjs/swagger';

export class CreateUserTokenInput {
  @ApiProperty()
  userId!: number;

  @ApiProperty()
  userTokens!: string;
}
