import { ApiProperty } from '@nestjs/swagger';

export class Room {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  roomNumber!: string;

  @ApiProperty()
  floorId!: number;

  @ApiProperty()
  price!: string;

  @ApiProperty()
  description!: string;
}
