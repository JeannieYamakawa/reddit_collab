
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1').then();
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({username: 'joeySucks1', password: 'password', email: 'joey@gmail.com', admin: false }),
        knex('users').insert({username: 'frankSucks2', password: 'password', email: 'frank@gmail.com', admin: false }),
        knex('users').insert({username: 'joeyRulez3', password: 'password', email: 'me@gmail.com', admin: true })
      ]);
    });
};
