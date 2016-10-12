'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const knex = require('../knex');


describe('***THE REDDIT CLONE***', () => {

  describe('GET /logout', () => {

    it('should redirect to the base URL', (done) => {
      request(app)
            .get('/logout')
            // .expect(200)
            .end((err, res) => {
              if(err) {
                done(err);
              }
                // console.log(res.header);
                // expect(res.header['location']).to.equal('/');
              expect(res.text).to.include('<div class="loginSignup">');
              done();
            });
    });
  });
});

describe('POSTS', function () {
  xit('should show all of the posts', function (done) {
    request(app).get('/posts')
              .expect(200)
              .end((err, res) => {
                if(err){
                  done(err);
                }
                knex('posts').then((posts)=>{
                  expect(res.text).to.include(posts[0].title);
                  expect(res.text).to.include(posts[1].title);
                  expect(res.text).to.include(posts[2].title);
                  done();
                });
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
