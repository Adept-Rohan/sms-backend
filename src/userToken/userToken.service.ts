import { Injectable } from '@nestjs/common';
import { CreateUserTokenInput } from './dto/create-user-token.input';
import { UpdateUserTokenInput } from './dto/update-user-token.input';
import { Knex } from 'knex';
import { KnexBase } from 'src/knex/knex-Base/knexBase';
import { InjectKnex } from 'src/knex/knex.decorator';

@Injectable()
export class UserTokenService extends KnexBase<
  CreateUserTokenInput,
  UpdateUserTokenInput,
  Knex.TableType<'userToken'>
>('userToken') {
  constructor(@InjectKnex readonly knex: Knex) {
    super(knex);
  }

  findByToken(userToken: string) {
    return this.table.first().where('userTokens', userToken);
  }

  //   deleteUserToken(id: number, refreshToken: string) {
  //     return this.table.delete().where({
  //       userId: id,
  //       userTokens: refreshToken,
  //     });
  //   }

  //   deleteAllUserToken(id: number) {
  //     return this.table.delete().where({ userId: id });
  //   }
}
