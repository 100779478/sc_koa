const jwt = require('jsonwebtoken')

const {createUser, getUserInfo, updateById} = require("../service/user")
const {userRegisterError, userLoginError, FailedPassword} = require("../constant/error.type");
const {JWT_SECRET} = require('../config/config.default')

class UserController {
    /**
     * 注册用户
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async register(ctx, next) {
        // 获取数据
        const {user_name, password} = ctx.request.body
        // 操作数据库
        try {
            const res = await createUser(user_name, password)
            // 返回结果
            ctx.body = {
                code: '0',
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name,
                }
            }
        } catch (err) {
            console.error(err)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }

    /**
     * 用户登录
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async login(ctx, next) {
        const {user_name} = ctx.request.body
        // 获取用户信息(在token的payload中，记录id,user_name,is_admin)
        try {
            // 从返回对象的结果中剔除password，剩余属性放到res中
            const {password, ...res} = await getUserInfo({user_name})
            ctx.body = {
                code: '0',
                message: '用户登录成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET, {expiresIn: '24h'})
                }
            }
        } catch (err) {
            console.error('用户登录失败', err)
            ctx.app.emit('error', userLoginError, ctx)
        }
    }

    /**
     * 修改密码
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async resetPassword(ctx, next) {
        // 获取数据
        const id = ctx.state.user.id
        const password = ctx.request.body.password
        // 操作数据库
        // 返回结果
        if (await updateById({id, password})) {
            ctx.body = {
                code: '0',
                message: '修改密码成功',
                result: {},
            }
        } else {
            console.error('修改密码失败')
            ctx.app.emit('error', FailedPassword, ctx)
        }
    }
}

module.exports = new UserController()