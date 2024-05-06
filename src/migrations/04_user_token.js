/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('user_token', (table) => {
    table.increments('id');
    table
      .integer('userId')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('user');
    table.text('userTokens', 'LONGTEXT').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable('user_token');
};
