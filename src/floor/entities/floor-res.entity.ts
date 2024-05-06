import { ApiProperty } from '@nestjs/swagger';
import { Floor } from '../entities/floor.entity';

export class FloorRes {
  @ApiProperty()
  data!: Floor[];

  @ApiProperty()
  totalCount!: number;
}
