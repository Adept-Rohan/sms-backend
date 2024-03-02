import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export class UserRes {
  @ApiProperty()
  data: User[];
}
