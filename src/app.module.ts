import { Module, OnModuleInit } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { KnexModule } from './knex/knex.module';
import { InjectKnex } from './knex/knex.decorator';
import { Knex } from 'knex';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, KnexModule, ConfigModule],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectKnex private knex: Knex) {}
  async onModuleInit() {
    await this.knex.migrate.latest();
  }
}
