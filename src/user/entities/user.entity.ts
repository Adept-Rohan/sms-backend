import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  username!: string;

  password!: string;

  @ApiProperty({
    type: Date,
  })
  createdOn!: string;

  @ApiProperty({
    enum: ['Admin', 'User'],
  })
  role!: 'Admin' | 'User';
}
