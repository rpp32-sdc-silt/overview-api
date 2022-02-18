const pactum = require('pactum');
const { app } = require('../app.js');

describe('Test Block', () => {
  let server;

  beforeAll((done) => {
    // pactum.mock.start(3000);
    server = app.listen(3000, () => {
      console.log('Server listening at http://localhost:3000');
    });
    done();
  });

  afterAll((done) => {
    server.close(done);
  })

  describe('Testing endpoint expected status codes', () => {

    test('products endpoint should return 200 status code', async () => {
      await pactum.spec()
        .get('http://localhost:3000/products')
        .expectStatus(200);
    });

    test('products/:product_id endpoint should return 200 status code', async () => {
      await pactum.spec()
        .get('http://localhost:3000/products/1')
        .expectStatus(200);
    });

    test('products/:product_id/styles endpoint should return 200 status code', async () => {
      await pactum.spec()
        .get('http://localhost:3000/products/1/styles')
        .expectStatus(200);
    });
  });

  describe('Testing Content-Type header values', () => {

    test('/products Content-Type header should be application/json', async () => {
      await pactum.spec()
        .get('http://localhost:3000/products')
        .expectHeaderContains('content-type', 'application/json')
    });

    test('/products Content-Type header should be application/json', async () => {
      await pactum.spec()
        .get('http://localhost:3000/products/1')
        .expectHeaderContains('content-type', 'application/json')
    });

    test('/products Content-Type header should be application/json', async () => {
      await pactum.spec()
        .get('http://localhost:3000/products/1/styles')
        .expectHeaderContains('content-type', 'application/json')
    });
  });

  describe('Checking first result value', () => {

    test('/products name should be "Camo Onesie"', async () => {
      var first = await pactum.spec()
        .get('http://localhost:3000/products')
        .expectStatus(200)
        .returns('[0]')
      expect(first.name).toBe('Camo Onesie');
    });
  });

  describe('Integration testing', () => {

    test('return product and styles for specific in product list', async () => {
      var firstId = await pactum.spec()
        .get('http://localhost:3000/products')
        .expectStatus(200)
        .returns('[0].id');
      await pactum.spec()
        .get('http://localhost:3000/products/{id}')
        .withPathParams('id', firstId)
        .expectStatus(200);
      await pactum.spec()
        .get('http://localhost:3000/products/{id}/styles')
        .withPathParams('id', firstId)
        .expectStatus(200);
    });

  });

})