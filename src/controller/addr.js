const {addAddress, findAllAddr, updateAddr, removeAddr, setDefaultAddr} = require('../service/addr')
const {addrRemoveFailed} = require("../constant/error.type");

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

    async findAll(ctx, next) {
        const user_id = ctx.state.user.id;
        const res = await findAllAddr(user_id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '获取地址列表成功',
                result: res
            }
        }
    }

    async update(ctx, next) {
        const user_id = ctx.state.user.id;
        const {id} = ctx.request.params
        const params = ctx.request.body
        const res = await updateAddr(user_id, id, params)
        if (res) {
            ctx.body = {
                code: 0,
                message: '修改地址成功',
                result: res
            }
        }
    }

    async remove(ctx, next) {
        const user_id = ctx.state.user.id;
        const {id} = ctx.request.params
        try {
            const res = await removeAddr(user_id, id)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '删除地址成功',
                    result: res
                }
            } else {
                ctx.app.emit('error', addrRemoveFailed, ctx)
            }
        } catch (e) {
            ctx.app.emit('error', addrRemoveFailed, ctx)
        }
    }

    async setDefault(ctx, next) {
        const user_id = ctx.state.user.id;
        const {id} = ctx.request.params
        const res = await setDefaultAddr(user_id, id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '设置默认成功',
                result: res
            }
        }
    }
}

module.exports = new AddrController()