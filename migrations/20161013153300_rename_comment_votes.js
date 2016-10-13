
exports.up = function(knex, Promise) {
  return knex.schema.renameTable('comments-posts', 'votes_comments');
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable('votes_comments', 'comments-posts');
};
