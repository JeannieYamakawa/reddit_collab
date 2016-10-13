exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('comments-posts', (table) => {
        table.increments()
        table.integer('user_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.integer('comment_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('comments')
            .onDelete('CASCADE');
        table.bool('upvote').notNullable().defaultTo(false);
        table.bool('downvote').notNullable().defaultTo(false);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comments-posts');
};
