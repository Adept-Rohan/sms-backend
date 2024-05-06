import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KnexBase } from 'src/knex/knex-Base/knexBase';
import { InjectKnex } from 'src/knex/knex.decorator';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';

@Injectable()
export class FloorService extends KnexBase<
  CreateFloorDto,
  UpdateFloorDto,
  Knex.TableType<'floor'>
>('floor') {
  constructor(@InjectKnex knex: Knex) {
    super(knex);
  }

  findByFloor(floorName: string, usernameField = 'floorName') {
    return this.table.where(usernameField, '=', floorName).first();
  }

  deleteFloor(id: number) {
    return this.table.where({ id: id }).delete();
  }
}
