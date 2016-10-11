exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('posts', function(table) {
    table.increments();
    table.string('title')
      .notNullable()
      .defaultTo('');
    table.string('body')
      .notNullable()
      .defaultTo('');
    table.integer('user_id')
      .unsigned()
      .index()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};
