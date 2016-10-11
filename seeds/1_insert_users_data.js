
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1, username: 'joeySucks', password: 'password', email: 'joey@gmail.com', admin: false }),
        knex('users').insert({id: 2, username: 'frankSucks', password: 'password', email: 'frank@gmail.com', admin: false }),
        knex('users').insert({id: 3, username: 'joeyRulez', password: 'password', email: 'me@gmail.com', admin: true })
      ]);
    });
};
