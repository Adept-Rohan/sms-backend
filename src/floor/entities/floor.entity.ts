import { ApiProperty } from '@nestjs/swagger';

export class Floor {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  floorName!: string;
}
