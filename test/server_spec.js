'use strict';

process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const knex = require('../knex');


describe('***THE REDDIT CLONE***', () => {

    describe('GET /logout', () => {

        it('should redirect to the base URL', (done) => {
            request(app)
            .get('/logout')
            .expect(302)
            .end((err, res) => {
                if(err) {
                    console.error(err);
                }
                expect(res.header['locaion']).to.equal('/');
                done();
            });
        });
    });
});
