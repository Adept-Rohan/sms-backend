/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id');
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.dateTime('createdOn').defaultTo(knex.fn.now());
    table.enum('role', ['ADMIN', 'USER']).defaultTo('USER');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
