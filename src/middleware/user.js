const bcrypt = require("bcryptjs")

const {
    userFormateError,
    userAlreadyExists,
    userRegisterError,
    userDoesNotExists,
    userLoginError, invalidPassword
} = require("../constant/error.type");
const {getUserInfo} = require("../service/user");
/**
 * 参数格式校验
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
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

/**
 * 注册用户时校验
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
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
/**
 * 登录校验
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
const verifyLogin = async (ctx, next) => {
    const {user_name, password} = ctx.request.body
    try {
        const res = await getUserInfo({user_name})
        // 判断用户是否存在
        if (!res) {
            console.error('用户名不存在', user_name)
            ctx.app.emit('error', userDoesNotExists, ctx)
            return
        }

        // 密码是否匹配
        if (!bcrypt.compareSync(password, res.password)) {
            console.error('密码不匹配')
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    } catch (e) {
        console.error('匹配用户失败', e)
        ctx.app.emit('error', userLoginError, ctx)
        return
    }

    await next()
}

/**
 * 密码加密
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
const encryptPassword = async (ctx, next) => {
    const {password} = ctx.request.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    ctx.request.body.password = hash
    await next()
}
module.exports = {
    userValidator,
    verifyUser,
    verifyLogin,
    encryptPassword
}