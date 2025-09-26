const {orderFormatError} = require("../constant/error.type");
const validator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (e) {
            console.error(e)
            return ctx.app.emit('error', orderFormatError, ctx)
        }

        await next()
    }
}

module.exports = {
    validator
}