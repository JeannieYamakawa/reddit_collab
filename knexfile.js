// ADD A DATABASE

'use strict';

module.exports = {

    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            database: ''
        }
    },

    test: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            database: ''
        }
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }
};
