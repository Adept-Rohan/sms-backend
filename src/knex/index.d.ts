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

  interface KnexRoom {
    id: number;
    roomNumber: string;
    floorId: number;
    price: string;
    description: string;
  }

  interface KnexFloor {
    id: number;
    floorName: string;
  }

  interface Tables {
    user: Knex.CompositeTableType<
      KnexUser,
      Omit<KnexUser, 'id'>,
      Partial<Pick<KnexUser>, 'id'>
    >;

    room: Knex.CompositeTableType<
      KnexRoom,
      Omit<KnexRoom, 'id'>,
      Partial<Pick<KnexRoom>, 'id'>
    >;

    floor: Knex.CompositeTableType<
      KnexFloor,
      Omit<KnexFloor, 'id'>,
      Partial<Pick<KnexFloor>, 'id'>
    >;

    userToken: Knex.CompositeTableType<
      KnexUserToken,
      Omit<KnexUserToken, 'id'>,
      Partial<Pick<KnexUserToken>, 'id'>
    >;
  }
}
