import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KnexBase } from 'src/knex/knex-Base/knexBase';
import { InjectKnex } from 'src/knex/knex.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService extends KnexBase<
  CreateRoomDto,
  UpdateRoomDto,
  Knex.TableType<'room'>
>('room') {
  constructor(@InjectKnex knex: Knex) {
    super(knex);
  }

  findByRoom(roomNumber: string, usernameField = 'roomNumber') {
    return this.table.where(usernameField, '=', roomNumber).first();
  }

  deleteRoom(id: number) {
    return this.table
      .where({ id: id })

      .delete();
  }
}
