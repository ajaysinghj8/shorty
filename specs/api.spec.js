const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../src/server');

let server;
let request;

describe('API spec', () => {

    before(() => {
        server = app.listen();
        request = supertest(server);
    });

    it('should create short code for a url', async () => {
        await request
            .post('/shorten')
            .send({
                "url": "http://example.com",
                "shortcode": "example"
            })
            .set('Accept', 'application/json')
            .expect(201)
            .expect('Content-Type', /json/)
            .expect(({ body }) => {
                expect(body.shortcode).to.be.string().and.not.empty();
            });

    });

    after(() => {
        server.close();
    });

});


