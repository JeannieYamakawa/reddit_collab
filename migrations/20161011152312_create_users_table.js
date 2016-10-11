
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('users', function (table) {
      table.increments();
      table.string('username').unique().notNullable().defaultTo("");
      table.string('password').notNullable().defaultTo("");
      table.string('email').unique().notNullable().defaultTo("");
      table.boolean('admin').defaultTo(false);
      table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
