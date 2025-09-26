const {createOrder, findAllOrders, updateOrder} = require("../service/order");
const {orderUpdateFailed} = require("../constant/error.type");

class OrderController {
    /**
     * 创建订单
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async create(ctx, next) {
        const user_id = ctx.state.user.id
        const {address_id, goods_info, total} = ctx.request.body;
        const order_number = 'SC' + Date.now()
        const res = await createOrder({
            user_id, address_id, goods_info, total, order_number
        });
        if (res) {
            ctx.body = {
                code: 0,
                message: '生成订单成功',
                result: res
            }
        }
    }

    /**
     * 获取订单列表
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async findAll(ctx, next) {
        const user_id = ctx.state.user.id
        const {pageNumber = 1, pageSize = 10} = ctx.request.query
        const res = await findAllOrders(user_id, pageNumber, pageSize)
        ctx.body = {
            code: 0,
            message: '获取订单列表成功',
            result: res
        }
    }

    /**
     * 更新订单状态
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async update(ctx, next) {
        const {id} = ctx.request.params
        const {status} = ctx.request.body
        try {
            const res = await updateOrder(id, status)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '订单状态更新成功',
                    result: res
                }
            }
        } catch (e) {
            console.error('订单状态更新失败', e)
            ctx.app.emit('error', orderUpdateFailed, ctx)
        }
    }
}

module.exports = new OrderController()