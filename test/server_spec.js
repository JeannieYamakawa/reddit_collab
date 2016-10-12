'use strict';

process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const knex = require('../knex');


describe('***SUITE HEADER***', () => {

    xdescribe('suite subheader', () => {

        it('User Story 1', (done) => {
            done();
        })

        it('User Story 2', (done) => {
            done();
        })

    });

});

describe('POSTS', function () {
 it('should show all of the posts', function (done) {
    request(app).get('/posts')
              .expect(200)
              .end((err, res) => {
                if(err){
                  done(err)
                }
                knex('posts').then((posts)=>{
                  expect(res.text).to.include(posts[0].title)
                  expect(res.text).to.include(posts[1].title)
                  expect(res.text).to.include(posts[2].title)
                  done()
                })
              })
 })
})
