const Koa = require('koa');
const KoaBody = require('koa-body');
const userRouter = require('../router/user')

const app = new Koa();

app.use(KoaBody.koaBody());
app.use(userRouter.routes()).use(userRouter.allowedMethods())

module.exports = app