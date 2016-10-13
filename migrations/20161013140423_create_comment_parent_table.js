exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('comment_parent', function(table) {
        table.increments();
        table.integer('comment_id');
        table.foreign('comment_id').references('comments.id')
        table.integer('parent_comment');
        table.foreign('parent_comment').references('comments.id')
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comment_parent');
};
