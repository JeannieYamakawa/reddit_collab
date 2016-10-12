const knex = require('../knex');

var users_app = {
  users: {
    get: {
      all: function() {
        return knex('users')
          .select(['id', 'username', 'email'])
          .orderBy('id');

      },
      byID: function(user_id) {
        return knex('users')
          .select(['id', 'username', 'email'])
          .first()
          .where({
            id: user_id
          });
      },
      byUsernameOrEmailWithHash: function(user_login) {
        return knex('users')
          .select(['id', 'username', 'email', 'password'])
          .first()
          .where({
            email: user_login
          })
          .OrWhere({
            username: user_login
          });
      },
      posts: {
        byUserID: function(user_id) {
          return knex('posts')
            .select('*')
            .where({
              user_id: user_id
            })
            .orderBy('created_at', 'desc');

        }

      }
    }
  }
};

module.exports = users_app;
