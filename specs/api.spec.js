const { expect } = require('chai');
const supertest = require('supertest');
const { rmdirSync } = require('fs');
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
                expect(body.shortcode).to.be.eq('example');
            });

    });

    it('should reject the request if url is missing', async () => {
        await request
            .post('/shorten')
            .send({})
            .set('Accept', 'application/json')
            .expect(400)
            .expect('Content-Type', /json/)
            .expect(({ body }) => {
                expect(body.message).to.be.eq('url is not present');
            });
    });

    it('should reject the request if shortcode format is incorrect', async () => {
        await request
            .post('/shorten')
            .send({
                "url": "http://example.com",
                "shortcode": "exa"
            })
            .set('Accept', 'application/json')
            .expect(422)
            .expect('Content-Type', /json/)
            .expect(({ body }) => {
                expect(body.message).to.be.eq('The shortcode fails to meet the following regexp: ^[0-9a-zA-Z_]{4,}$.');
            });
    });

    it('should redirect to example.com', async () => {
        await request
            .get('/example')
            .expect(302)
            .expect('Location', 'http://example.com');
    });


    it('should response 404', async () => {
        await request
            .get('/xyz')
            .expect(404)
            .expect(({ body }) => {
                expect(body.message).to.be.eq('The shortcode cannot be found in the system');
            });
    });

    after(() => {
        server.close();
    });

});


