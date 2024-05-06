/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('room', (table) => {
    table.increments('id');
    table.string('roomNumber').notNullable();
    table.string('price').notNullable();
    table.string('description').notNullable();
    table
      .integer('floorId')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('floor');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable('room');
};
