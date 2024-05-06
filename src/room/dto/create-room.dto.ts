import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Unique Room Number',
  })
  roomNumber!: string;

  @IsNotEmpty()
  @IsString()
  price!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  floorId!: number;
}
