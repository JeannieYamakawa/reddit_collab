
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1').then();
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({username: 'joeySucks', password: 'password', email: 'joey@gmail.com', admin: false }),
        knex('users').insert({username: 'frankSucks', password: 'password', email: 'frank@gmail.com', admin: false }),
        knex('users').insert({username: 'joeyRulez', password: 'password', email: 'me@gmail.com', admin: true })
      ]);
    });
};
