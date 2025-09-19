const path = require('path')
const Koa = require('koa');
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');
const parameter = require('koa-parameter');
const router = require('../router')
const errorHandler = require('./errorHandler')

const app = new Koa();


app.use(KoaBody.koaBody({
    // 配置可接收图片等格式
    multipart: true,
    parsedMethods: ['DELETE', 'PUT', 'POST', 'PATCH'],
    formidable: {
        uploadDir: path.join(__dirname, '../uploads'),
        keepExtensions: true
    }
}));
app.use(KoaStatic(path.join(__dirname, '../uploads')))
parameter(app)
app.use(router.routes()).use(router.allowedMethods())

// 错误统一处理
app.on('error', (err, ctx) => {
    errorHandler(err, ctx)
})

module.exports = app