
exports.up = function(knex, Promise) {
  return knex.schema.renameTable('votes-posts', 'votes_posts');
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable('votes_posts', 'votes-posts');
};
