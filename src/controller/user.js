const {createUser} = require("../service/user")

class UserController {
    async register(ctx, next) {
        // 获取数据
        const {user_name, password} = ctx.request.body
        // 操作数据库
        const res = await createUser(ctx.request.body)
        // 返回结果
        ctx.body = res
    }

    async login(ctx, next) {
        ctx.body = '登录成功'
    }
}

module.exports = new UserController()