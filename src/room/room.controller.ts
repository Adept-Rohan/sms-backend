import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiOkResponse, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RoomRes } from './dto/room-res.entity';

@ApiTags('room')
@ApiSecurity('bearer')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    try {
      const existingRoom = await this.roomService.findByRoom(
        createRoomDto.roomNumber,
      );

      if (Object.keys(existingRoom).length > 1) {
        throw new BadRequestException('The given room number already exists');
      }

      return this.roomService.create(createRoomDto);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Internal Server Error' + error);
    }
  }

  @Get()
  @ApiOkResponse({ type: RoomRes })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search By Room Number',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'Page Number Starting with 0',
  })
  @ApiQuery({
    name: 'pageSize',
    required: true,
    description: '10',
  })
  async findAll(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('search') search?: string,
  ): Promise<RoomRes> {
    const totalCountQuery = this.roomService.table.count({
      count: 'id',
    });

    const query = this.roomService
      .findAll()
      .limit(pageSize)
      .select('description', 'floorId', 'id', 'price', 'roomNumber')
      .offset(page * pageSize);

    if (search) {
      query.whereILike('roomNumber', `%${search}%`);
      totalCountQuery.whereILike('roomNumber', `%${search}%`);
    }

    const data = await query.select();

    const res = {
      data: data,
      totalCount: (await totalCountQuery.first())?.count ?? 0,
    };

    return res;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.deleteRoom(+id);
  }
}
