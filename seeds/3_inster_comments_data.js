
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      knex.raw('ALTER SEQUENCE comments_id_seq RESTART WITH 1').then();
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({content: '2 - Booyah', post_id: 2, user_id: 1}),
        knex('comments').insert({content: '1 - No way Jose', post_id: 1, user_id: 1}),
        knex('comments').insert({content: '3 - Leave me alone', post_id: 3, user_id: 2}),
        knex('comments').insert({content: '4 - Woo woo woo', post_id: 3, user_id: 3 }),
        knex('comments').insert({content: '5 - Yahboo', post_id: 1, user_id: 3})
      ]);
    });
};
