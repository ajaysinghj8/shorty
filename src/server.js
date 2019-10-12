const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

const { createShortUrlHandler } = require('./handlers/shorten');

const server = new Koa();
const router = new Router();

server.use(koaBody());
/** Routes */

router.post('/shorten', createShortUrlHandler);

server
    .use(router.routes())
    .use(router.allowedMethods());


module.exports = server;
