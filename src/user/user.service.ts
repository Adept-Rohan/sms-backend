import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KnexBase } from 'src/knex/knex-Base/knexBase';
import { InjectKnex } from 'src/knex/knex.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends KnexBase<
  CreateUserDto,
  UpdateUserDto,
  Knex.TableType<'user'>
>('user') {
  constructor(@InjectKnex knex: Knex) {
    super(knex);
  }

  // createUser(dto: CreateUserDto) {
  //   return this.table.insert(dto);
  // }

  findByUserName(username: string, usernameField = 'username') {
    return this.table.where(usernameField, '=', username).first();
  }
}
