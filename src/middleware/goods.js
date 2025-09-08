const {getGoods} = require('../service/goods')
const {goodsFormatError, goodsIsNotUnique} = require("../constant/error.type");
const validator = async (ctx, next) => {
    try {
        await ctx.verifyParams({
            goods_name: {
                type: 'string',
                required: true,
            },
            goods_price: {
                type: 'number',
                required: true,
            },
            goods_num: {
                type: 'number',
                required: true,
            },
            goods_img: {
                type: 'string',
                required: true,
            }
        })
    } catch (err) {
        console.error(err)
        goodsFormatError.result = err
        ctx.app.emit('error', goodsFormatError, ctx)
        return
    }

    await next()
}
/**
 * 检查商品名称是否重复
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
const checkGoodsUnique = async (ctx, next) => {
    const {goods_name} = ctx.request.body
    const {id} = ctx.params
    const res = await getGoods({goods_name})
    if (res) {
        if (!id && res.id !== id) {
            console.error('商品名称重复')
            ctx.app.emit('error', goodsIsNotUnique, ctx)
            return  // 不调用 next()，阻止继续执行
        }
    }
    await next()
}

module.exports = {validator, checkGoodsUnique}