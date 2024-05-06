import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFloorDto {
  @IsString()
  @ApiProperty({
    description: 'Unique Floor Name',
  })
  floorName!: string;
}
