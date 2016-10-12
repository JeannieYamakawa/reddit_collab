var reddit_users = {
  users_app: {
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
      }
    }
  }
};

module.exports = reddit_users.users_app;
