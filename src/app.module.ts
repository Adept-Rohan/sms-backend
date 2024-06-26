import { Module, OnModuleInit } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { KnexModule } from './knex/knex.module';
import { InjectKnex } from './knex/knex.decorator';
import { Knex } from 'knex';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FloorModule } from './floor/floor.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [UserModule, KnexModule, ConfigModule, AuthModule, FloorModule, RoomModule],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectKnex private knex: Knex) {}
  async onModuleInit() {
    await this.knex.migrate.latest();
  }
}
