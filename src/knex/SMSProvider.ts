import { Logger, Provider } from '@nestjs/common';
import { DEFAULT_KNEX_TOKEN } from './constant';

import { ConfigService } from '@nestjs/config';
import knex, { Knex } from 'knex';

import { processLocalDBResponse } from './knex-Base/processLocalDBStorage';
import * as _ from 'lodash';

export const SMSProvider: Provider = {
  provide: DEFAULT_KNEX_TOKEN,
  inject: [ConfigService],
  useFactory: async (ConfigService: ConfigService) => {
    const logger = new Logger('LocalKnexProvider');

    const instance = knex({
      ...(ConfigService.getOrThrow('database') as Knex.Config),

      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: 'src/migrations',
      },
      seeds: {
        directory: 'src/seeds',
      },

      log: {
        debug: (m) => logger.debug(m),
        error: (m) => logger.error(m),
        warn: (m) => logger.warn(m),
      },
      postProcessResponse: processLocalDBResponse,
      wrapIdentifier: (value, origImpl) => origImpl(_.snakeCase(value)),
    });
    try {
      await instance.raw('select 1+1 as result');
      logger.log('Local Datbase succesfully connected');
      return instance;
    } catch (err) {
      logger.error('error', err);
      process.exit(1);
    }
  },
};
