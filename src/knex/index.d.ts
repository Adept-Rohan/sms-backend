import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface KnexUser {
    id: number;
    username: string;
    password?: string;
    createdOn?: Date;
    role: string;
  }

  interface KnexUserToken {
    id: number;
    userToken: string;
  }

  interface Tables {
    user: Knex.CompositeTableType<
      KnexUser,
      Omit<KnexUser, 'id'>,
      Partial<Pick<KnexUser>, 'id'>
    >;

    userToken: Knex.CompositeTableType<
      KnexUserToken,
      Omit<KnexUserToken, 'id'>,
      Partial<Pick<KnexUserToken>, 'id'>
    >;
  }
}
