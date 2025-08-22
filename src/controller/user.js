const {createUser, getUserInfo} = require("../service/user")
const {userAlreadyExists, userFormateError} = require("../constant/error.type");

class UserController {
    async register(ctx, next) {
        // 获取数据
        const {user_name, password} = ctx.request.body
        // 合法性
        if (!user_name || !password) {
            console.error('用户名或密码为空', ctx.request.body)
            ctx.status = 400
            ctx.body = userFormateError
            return
        }
        // 合理性
        if (getUserInfo({user_name})) {
            ctx.status = 409
            ctx.body = userAlreadyExists
            return
        }
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
        } catch (e) {
            console.log(1111, e)
        }
    }

    async login(ctx, next) {
        ctx.body = '登录成功'
    }
}

module.exports = new UserController()