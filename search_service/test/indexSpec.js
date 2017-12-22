let request = require('supertest');
const app = require('../index.js')
// const chai = require('chai');



describe('GET /listings/search/:city', function () {
  it('should respond with statusCode 200', function (done) {
    request(app).get('/listings/search/oakland')
      .expect(200, done)
  });
  it('should respond with an object', function (done) {
    request(app).get('/listings/search/oakland')
      .expect(function (res) {
        if (typeof res.body !== 'object' || Array.isArray(res.body)) {
          throw new Error (`should respond with an object but got: ${typeof res.body}`);
        }
      })
      .end(done);
  });
  it('should have a property "city"', function (done) {
    request(app).get('/listings/search/oakland')
      .expect(function (res) {
        if (!('city' in res.body)) {
          throw new Error ('should have an object property of "city"');
        }
      })
      .end(done);
  });
  it('city property should be a string', function (done) {
    request(app).get('/listings/search/oakland')
      .expect(function (res) {
        if (typeof res.body.city !== 'string') {
          throw new Error ('city property should be a  string');
        }
        if (res.body.city.length <= 0) {
          throw new Error('city should not be an empty string');
        }
      })
      .end(done);
  });
  it('should have a property "data"', function (done) {
    request(app).get('/listings/search/oakland')
      .expect(function (res) {
        if (!('data' in res.body)) {
          throw new Error ('should have an object property of "data"');
        }
      })
      .end(done);
  });
  it('data property should be an array', function (done) {
    request(app).get('/listings/search/oakland')
      .expect(function (res) {
        if (!Array.isArray(res.body.data)) {
          throw new Error ('should be an array');
        }
        if (!res.body.data.length) {
          throw new Error('array should not be empty');
        }
      })
      .end(done);
  });
});

describe('GET /listings/search/:city/:pagenum', function () {
  it('should respond with statusCode 200', function (done) {
    request(app).get('/listings/search/oakland/2')
      .expect(200, done)
  });
  it('should respond with an object', function (done) {
    request(app).get('/listings/search/oakland/2')
      .expect(function (res) {
        if (typeof res.body !== 'object' || Array.isArray(res.body)) {
          throw new Error ('should respond with an object');
        }
      })
      .end(done);
  });
  it('should have a property "city"', function (done) {
    request(app).get('/listings/search/oakland/2')
      .expect(function (res) {
        if (!('city' in res.body)) {
          throw new Error ('should have an object property of "city"');
        }
      })
      .end(done);
  });
  it('city property should be a string', function (done) {
    request(app).get('/listings/search/oakland/2')
      .expect(function (res) {
        if (typeof res.body.city !== 'string') {
          throw new Error ('city property should be a  string');
        }
        if (res.body.city.length <= 0) {
          throw new Error('city should not be an empty string');
        }
      })
      .end(done);
  });
  it('should have a property "data"', function (done) {
    request(app).get('/listings/search/oakland/2')
      .expect(function (res) {
        if (!('data' in res.body)) {
          throw new Error ('should have an object property of "data"');
        }
      })
      .end(done);
  });
  it('data property should be an array', function (done) {
    request(app).get('/listings/search/oakland/2')
      .expect(function (res) {
        if (!Array.isArray(res.body.data)) {
          throw new Error ('should be an array');
        }
        if (!res.body.data.length) {
          throw new Error('array should not be empty');
        }
      })
      .end(done);
  });
});

describe('POST /listings/clicks', function () {
  it('post reponse should be 204', function(done) {
    request(app).post('/listings/clicks')
      .send({id: '123456789'})
      .expect(204, done)
  });
  it('should accept object with "id" property', function (done) {
    request(app).post('/listings/clicks')
    .send({id : '123456789'})
      .expect(204)
      .end(done)
  });
  it('should return status code 400 if post object is empty', function (done) {
    request(app).post('/listings/clicks')
    .send({})
      .expect(400)
      .end(done)
  });
  it('should return status code 400 if post object property is not "id" ', function (done) {
    request(app).post('/listings/clicks')
    .send({notId: '123456789'})
      .expect(400)
      .end(function(err, res){
        done();
      });
  });
});

describe('POST /listings/add', function () {
  it('post reponse should be 204', function(done) {
    request(app).post('/listings/add')
      .send({id: 123456789,availability:'true',isinterior:'false',city: 'oakland', clicks: 1 })
      .expect(201, done)
  });
  it('should accept object with "id" property', function (done) {
    request(app).post('/listings/add')
    .send({id: 123456789,availability:'true',isinterior:'false',city: 'oakland', clicks: 1 })
    .expect(201)
      .end(done)
  });
  it('should return status code 400 if post object is empty', function (done) {
    request(app).post('/listings/add')
    .send({})
      .expect(400)
      .end(done)
  });
  it('should return status code 400 if post object property is not "id" ', function (done) {
    request(app).post('/listings/add')
    .send({notId: '123456789'})
      .expect(400)
      .end(function(err, res){
        done();
      });
  });
});

describe('Unhandled endpoints will respond with statusCode 404', function () {
  it('should respond with statusCode 404', function (done) {
    request(app).get('/')
      .expect(404, done)
  });
  it('should respond with a string', function (done) {
    request(app).get('/')
      .expect(function (res) {
        if (typeof res.text !== 'string') {
          throw new Error ('should respond with a string');
        }
      })
      .end(done);
  });
  it('should respond with a message: "This is not the page you are looking for..."', function (done) {
    request(app).get('/')
      .expect(function (res) {
        const message = 'This is not the page you are looking for...';
        if (res.text !== message) {
          throw new Error ('should respond with the correct message');
        }
      })
      .end(done);
  });
});

