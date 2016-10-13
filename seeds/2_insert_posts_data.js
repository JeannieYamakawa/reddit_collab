
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      knex.raw('ALTER SEQUENCE posts_id_seq RESTART WITH 1').then();
      return Promise.all([
        // Inserts seed entries
        knex('posts').insert({title: 'Look at this', body: 'Seriously tho...', user_id: 1}),
        knex('posts').insert({title: 'I did it!', body: 'Look at me go!', user_id: 2}),
        knex('posts').insert({title: 'Check me out', body: 'Go away', user_id: 3 })
      ]);
    });
};
