const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require('../config/config.default')
const {tokenExpiredError, jsonWebTokenExpiredError, hasNotAdminPermission} = require("../constant/error.type");
/**
 * 检查用户是否登录
 * @param ctx
 * @param next
 * @returns {Promise<boolean>}
 */
const auth = async (ctx, next) => {
    const {authorization} = ctx.request.header
    try {
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

const hadAdminPermission = async (ctx, next) => {
    const {is_admin} = ctx.state.user
    if (!is_admin) {
        console.error('权限不足', ctx.state.user)
        return ctx.app.emit('error', hasNotAdminPermission, ctx)
    }
    await next()
}

module.exports = {
    auth,
    hadAdminPermission
}