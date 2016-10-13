
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comment_parent').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comment_parent').insert({id: 1, comment_id: 3, parent_comment: 2}),
        knex('comment_parent').insert({id: 2, comment_id: 4, parent_comment: 3}),
        knex('comment_parent').insert({id: 3, comment_id: 5, parent_comment: 2})
      ]);
    });
};
