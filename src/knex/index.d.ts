import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface KnexUser {
    id: number;
    username: string;
    password: string;
    createdOn?: Date;
    role: string;
  }

  interface Tables {
    user: Knex.CompositeTableType<
      KnexUser,
      Omit<KnexUser, 'id'>,
      Partial<Pick<KnexUser>, 'id'>
    >;
  }
}
