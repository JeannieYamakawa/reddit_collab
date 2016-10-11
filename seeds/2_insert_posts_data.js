
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('posts').insert({id: 1, title: 'Look at this', body: 'Seriously tho...', user_id: 1}),
        knex('posts').insert({id: 2, title: 'I did it!', body: 'Look at me go!', user_id: 2}),
        knex('posts').insert({id: 3, title: 'Check me out', body: 'Go away', user_id: 3 })
      ]);
    });
};
