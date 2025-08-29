const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require('../config/config.default')
const {tokenExpiredError, jsonWebTokenExpiredError} = require("../constant/error.type");
const auth = async (ctx, next) => {
    try {
        const {authorization} = ctx.request.header
        if (!authorization) {
            console.error('请求缺少 token')
            return ctx.app.emit('error', jsonWebTokenExpiredError, ctx)
        }
        const token = authorization.replace('Bearer ', '')
        // user中包含了 payload 的信息(id, user_name, is_admin)
        ctx.state.user = jwt.verify(token, JWT_SECRET)
    } catch (err) {
        console.log(err.name)
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token 已过期', err)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenExpiredError':
                console.error('无效的 token')
                return ctx.app.emit('error', jsonWebTokenExpiredError, ctx)
        }
    }
    await next();
}

module.exports = {
    auth
}