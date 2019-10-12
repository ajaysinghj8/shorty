const Koa = require('koa');
const Router = require('koa-router');

const server = new Koa();
const router = new Router();

server
    .use(router.routes())
    .use(router.allowedMethods());


module.exports = server;
