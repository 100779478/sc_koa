const {addAddress} = require('../service/addr')

class AddrController {
    async add(ctx, next) {
        try {
            const user_id = ctx.state.user.id;
            const res = await addAddress(user_id, ctx.request.body)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '添加地址成功',
                    result: res
                }
            }
        } catch (err) {
            console.error('添加地址失败', err)
        }
    }
}

module.exports = new AddrController()