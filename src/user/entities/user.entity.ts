import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  username!: string;

  @ApiProperty({
    type: Date,
  })
  createdOn?: Date;

  @ApiProperty({
    enum: ['Admin', 'User'],
  })
  role!: 'Admin' | 'User';
}
