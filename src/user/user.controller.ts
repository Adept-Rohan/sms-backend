import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRes } from './entities/user-res.entity';

@Controller('user')
@ApiTags('Users')
@ApiSecurity('bearer')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserRes })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search by department name',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'Page number starting with 0',
  })
  @ApiQuery({
    name: 'pageSize',
    required: true,
    example: '10',
  })
  async findAll(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('search') search?: string,
  ) {
    const totalCountQuery = this.userService.table.count({
      count: 'id',
    });

    const query = this.userService
      .findAll()
      .select('id', 'createdOn', 'role', 'username')
      .limit(pageSize)
      .offset(page * pageSize);

    if (search) {
      query.whereILike('username', `%${search}%`);
      totalCountQuery.whereILike('username', `%${search}%`);
    }

    const res = {
      totalCountQuery: (await totalCountQuery.first())?.count ?? 0,
    };

    return res;
  }
}
