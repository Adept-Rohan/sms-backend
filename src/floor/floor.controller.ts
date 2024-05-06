import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { FloorService } from './floor.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import {
  ApiCreatedResponse,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Floor } from './entities/floor.entity';
import { FloorRes } from './entities/floor-res.entity';

@ApiTags('floor')
@Controller('floor')
@ApiSecurity('bearer')
export class FloorController {
  constructor(private readonly floorService: FloorService) {}

  @Post()
  @ApiCreatedResponse({ type: Floor })
  async create(@Body() createFloorDto: CreateFloorDto) {
    try {
      const existingFloor = await this.floorService.findByFloor(
        createFloorDto.floorName,
      );

      if (Object.keys(existingFloor).length > 1) {
        throw new BadRequestException('The Floor already exists');
      }

      return this.floorService.create(createFloorDto);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Internal Server Error' + error);
    }
  }

  @Get()
  @ApiResponse({ type: FloorRes })
  findAll() {
    return this.floorService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFloorDto: UpdateFloorDto) {
    return this.floorService.update(+id, updateFloorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.floorService.deleteFloor(+id);
  }
}
