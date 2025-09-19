const {addrValidatorError} = require("../constant/error.type");
const validator = (rules) => {
    return async function (ctx, next) {
        try {
            await ctx.verifyParams(rules);
        } catch (err) {
            console.error('地址参数不符合格式', err)
            addrValidatorError.result = err
            return ctx.app.emit('error', addrValidatorError, ctx)
        }
        await next()
    }
}

module.exports = {
    validator
}