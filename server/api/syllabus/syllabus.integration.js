'use strict';

var app = require('../..');
import request from 'supertest';

var newSyllabuses;

describe('Syllabus API:', function() {

  describe('GET /api/syllabuses', function() {
    var syllabuses;

    beforeEach(function(done) {
      request(app)
        .get('/api/syllabuses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          syllabuses = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      syllabuses.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/syllabuses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/syllabuses')
        .send({
          name: 'New Syllabuses',
          info: 'This is the brand new syllabuses!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSyllabus = res.body;
          done();
        });
    });

    it('should respond with the newly created syllabuses', function() {
      newSyllabuses.name.should.equal('New Syllabuses');
      newSyllabuses.info.should.equal('This is the brand new syllabuses!!!');
    });

  });

  describe('GET /api/syllabuses/:id', function() {
    var syllabuses;

    beforeEach(function(done) {
      request(app)
        .get('/api/syllabuses/' + newSyllabuses._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          syllabuses = res.body;
          done();
        });
    });

    afterEach(function() {
      syllabuses = {};
    });

    it('should respond with the requested syllabuses', function() {
      syllabuses.name.should.equal('New Syllabuses');
      syllabuses.info.should.equal('This is the brand new syllabuses!!!');
    });

  });

  describe('PUT /api/syllabuses/:id', function() {
    var updatedSyllabuses;

    beforeEach(function(done) {
      request(app)
        .put('/api/syllabuses/' + newSyllabuses._id)
        .send({
          name: 'Updated Syllabuses',
          info: 'This is the updated syllabuses!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSyllabuses = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSyllabuses = {};
    });

    it('should respond with the updated syllabuses', function() {
      updatedSyllabuses.name.should.equal('Updated Syllabuses');
      updatedSyllabuses.info.should.equal('This is the updated syllabuses!!!');
    });

  });

  describe('DELETE /api/syllabuses/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/syllabuses/' + newSyllabuses._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when syllabuses does not exist', function(done) {
      request(app)
        .delete('/api/syllabuses/' + newSyllabuses._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
