import { ApiProperty } from '@nestjs/swagger';
import { Room } from '../entities/room.entity';

export class RoomRes {
  @ApiProperty()
  data!: Room[];

  @ApiProperty()
  totalCount!: number;
}
