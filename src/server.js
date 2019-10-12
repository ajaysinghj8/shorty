const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

const { createShortUrlHandler, redirectFromShortCodeHandler, redirectURLStatsHandler } = require('./handlers/shorten');

const server = new Koa();
const router = new Router();

server.use(koaBody());
/** Routes */

router.post('/shorten', createShortUrlHandler);
router.get('/:shortcode/stats', redirectURLStatsHandler);

router.get('/:shortcode', redirectFromShortCodeHandler);

server
    .use(router.routes())
    .use(router.allowedMethods());


module.exports = server;
