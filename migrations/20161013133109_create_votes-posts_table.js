exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('votes-posts'(table) => {
        table.increments()
        table.integer('user_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.integer('post_id')
            .unsigned()
            .index()
            .references('id')
            .inTable('posts')
            .onDelete('CASCADE');
        table.bool('upvote').notNullable().defaultTo(false);
        table.bool('downvote').notNullable().defaultTo(false);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('votes-posts')
};
