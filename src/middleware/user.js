const {userFormateError, userAlreadyExists, userRegisterError} = require("../constant/error.type");
const {getUserInfo} = require("../service/user");
const userValidator = async (ctx, next) => {
    const {user_name, password} = ctx.request.body

    // 合法性
    if (!user_name || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx)
        return
    }

    await next()
}

const verifyUser = async (ctx, next) => {
    const {user_name} = ctx.request.body
    // 合理性
    try {
        const res = await getUserInfo({user_name})
        if (res) {
            console.error('用户名已经存在', user_name)
            ctx.app.emit('error', userAlreadyExists, ctx)
            return
        }
    } catch (e) {
        console.error('获取用户信息错误', e)
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }

    await next()
}

module.exports = {
    userValidator,
    verifyUser
}