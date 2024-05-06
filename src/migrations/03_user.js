/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id');
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('address').notNullable();
    table.string('image').notNullable();
    table.string('college');
    table.boolean('isActive').defaultTo(true).notNullable();
    table.dateTime('createdOn').defaultTo(knex.fn.now());
    table.string('phoneNumber').notNullable();
    table.string('joinedDate');
    table.string('leaveDate');
    table
      .integer('roomId')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('room');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
