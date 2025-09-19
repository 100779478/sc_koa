// 校验格式
const {cartValidatorError} = require("../constant/error.type");
const validator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (err) {
            console.error('购物车参数不符合格式', err)
            cartValidatorError.result = err
            return ctx.app.emit('error', cartValidatorError, ctx)
        }
        await next()
    }
}

module.exports = {
    validator
}