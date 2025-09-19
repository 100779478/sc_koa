const {
    createOrUpdate,
    getCartsList,
    updateCart,
    removeCarts,
    selectAllCarts,
    unSelectAllCarts
} = require('../service/cart');
const {cartValidatorError, removeCartsFailed} = require("../constant/error.type");

class CartController {
    async add(ctx, next) {
        const {goods_id} = ctx.request.body;
        const user_id = ctx.state.user.id
        const res = await createOrUpdate(user_id, goods_id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '添加购物车成功',
                result: res
            }
        }
    }

    /**
     *  获取购物车列表
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async getCarts(ctx, next) {
        const {pageNumber = 1, pageSize = 10} = ctx.request.query
        const res = await getCartsList(pageNumber, pageSize)
        if (res) {
            ctx.body = {
                code: 0,
                message: '获取购物车列表成功',
                result: res
            }
        }
        await next()
    }

    /**
     * 更新购物车
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async update(ctx, next) {
        const {id} = ctx.request.params;
        const {number, selected} = ctx.request.body;
        if (!number && !selected) {
            ctx.app.emit('error', cartValidatorError, ctx)
            return
        }

        const res = await updateCart({id, number, selected})
        if (res) {
            ctx.body = {
                code: 0,
                message: '更新购物车成功',
                result: res
            }
        }
    }

    /**
     * 移除购物车
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async remove(ctx, next) {
        try {
            const {ids} = ctx.request.body;
            const res = await removeCarts(ids)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '购物车移除成功',
                    result: res
                }
            }
        } catch (e) {
            console.error('购物车移除失败', e)
            ctx.app.emit('error', removeCartsFailed, ctx)
        }
    }

    async selectAll(ctx, next) {
        const user_id = ctx.state.user.id
        const res = await selectAllCarts(user_id)

        if (res) {
            ctx.body = {
                code: 0,
                message: '全部选中',
                result: res
            }
        }
    }

    async unSelectAll(ctx, next) {
        const user_id = ctx.state.user.id
        const res = await unSelectAllCarts(user_id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '取消全部选中',
                result: res
            }
        }
    }
}

module.exports = new CartController();