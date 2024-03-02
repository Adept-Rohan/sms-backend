/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import * as bcrypt from 'bcrypt';

const myPassword = 'rohan';
const hash = bcrypt.hashSync(myPassword, 12);

exports.seed = async function (knex) {
  await knex('user').insert([
    {
      id: 1,
      username: 'rohan',
      password: hash,
      createdOn: '2058/03/20',
      role: 'Admin',
    },
  ]);
};
