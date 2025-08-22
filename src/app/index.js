const Koa = require('koa');
const KoaBody = require('koa-body');
const userRouter = require('../router/user')
const errorHandler = require('./errorHandler')

const app = new Koa();

app.use(KoaBody.koaBody());
app.use(userRouter.routes()).use(userRouter.allowedMethods())

// 错误统一处理
app.on('error', (err, ctx) => {
    errorHandler(err, ctx)
})

module.exports = app