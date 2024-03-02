import { Inject } from '@nestjs/common';

import { DEFAULT_KNEX_TOKEN } from './constant';

export const InjectKnex = Inject(DEFAULT_KNEX_TOKEN);
