
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({id: 1, content: 'Booyah', post_id: 2, user_id: 1}),
        knex('comments').insert({id: 2, content: 'No way Jose', post_id: 1, user_id: 1}),
        knex('comments').insert({id: 3, content: 'Leave me alone', post_id: 3, user_id: 2}),
        knex('comments').insert({id: 4, content: 'Woo woo woo', post_id: 3, user_id: 3 }),
        knex('comments').insert({id: 5, content: 'Yahboo', post_id: 1, user_id: 3})
      ]);
    });
};
