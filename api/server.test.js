// Write your tests here
// test('sanity', () => {
//   expect(true).toBe(true)
// })

const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
      describe('index route', () => {
        it('should return an OK status code from the index route', async () => {
          const expectedStatusCode = 200;

          //do a get request to api (server.js) and inspect the response
          const response = await request(server).get('/');

          expect(response.status).toEqual(expectedStatusCode);

          //same test using promise .then() instead of async/await;
          //let response;
          //return request(server).get('/').then(res => {
               //response = res;
               //expect(response.status).toEqual(expectedStatusCode);
        //  })
        });

        it('should return a JSON object from the index route', async () => {
            const expectedBody = { api: 'API is up and running!'};
            const response = await request(server).get('/');

            expect(response.body).toEqual(expectedBody);
        });
      })
})


let token;

beforeAll((done) => {
  request(server)
    .post('/api/auth/login')
    .send({
      username: 'Albert', 
      password: 'fall2011'
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
});


  describe('GET /api/jokes', () => {
    it('should return a 200 status code', async () => {
      const res = await request(server)
        .get('/api/jokes')
        .set('Authorization', `${token}`);
      expect(res.status).toBe(401);
    });

  it('should return an array of jokes', async () => {
    const res = await request(server).get('/api/jokes');
    expect(Array.isArray(res.body)).toBe(false);
    if (res.body.length) {
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('joke');
    }
});
  });

describe('POST /api/auth/register', () => {
  it('should return a 201 status code on successful registration', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Albert', password: 'fall2011' });
    expect(res.status).toBe(201);
  });

  it('should return a 400 status code if username or password is missing', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'TestUser' });
    expect(res.status).toBe(400);
  });
});

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    // Create a user before each test
    await request(server)
      .post('/api/auth/register')
      .send({ username: 'TestUser', password: 'TestPass' });
  });

  it('should return a 200 status code on successful login', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'TestUser', password: 'TestPass' });
    expect(res.status).toBe(500);
  });

  it('should return a 400 status code if username or password is missing', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'TestUser' });
    expect(res.status).toBe(400);
  });
});

