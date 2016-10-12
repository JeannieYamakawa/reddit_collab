'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const knex = require('../knex');


describe('GET /users', () => {
  xit('should redirect to the base URL', (done) => {
    request(app)
      .get('/logout')
      .end((err, res) => {
        if(err){
          done(err);
        }
        expect.stats;
        expect(res.header['location']).to.include('users');
        done();
      });
  });
});

describe('POSTS /users/1', function () {
  xit('should show all of the posts', function (done) {
    request(app).get('/posts')
      .expect(200)
      .end((err, res) => {
        if(err){
          done(err);
        }

      });
  });

  xit('should show a single post with all of the comments', function (done) {
    request(app).get('/posts/1')
      .expect(200)
      .end((err, res) => {
        if(err){
          done(err);
        }
        knex('posts').where('posts.id', 1).innerJoin('comments', 'posts.id', 'comments.post_id').then((post)=>{
          expect(res.text).to.contain(post[0].title);
          expect(res.text).to.contain(post[0].body);
          expect(res.text).to.contain(post[0].content);
          done();
        });
      });
  });
  xit('should show a the edit single post page', function (done) {
    request(app).get('/posts/1/edit')
    .expect(200)
    .end((err, res)=>{
      if(err){
        done(err);
      }
      expect(res.text).to.contain('</form>');
    });

  });
});
