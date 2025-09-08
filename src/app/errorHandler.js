// errorHandler.js
const codeStatusMap = {
    '10001': 400, // userFormateError
    '10002': 409, // userAlreadyExists
    '10003': 400, // userRegisterError
    '10004': 404, // userDoesNotExists
    '10005': 500, // userLoginError
    '10006': 400, // invalidPassword
    '10007': 500, // FailedPassword
    '10101': 401, // tokenExpiredError
    '10102': 401, // jsonWebTokenExpiredError
    '10103': 403, // hasNotAdminPermission
    '10201': 500, // FileUploadError
    '10202': 400, // FileTypeError
    '10203': 400, // goodsFormatError
    '10204': 500, // createGoodsFailed
    '10205': 409, // goodsIsNotUnique
}

module.exports = (err, ctx) => {
    ctx.status = codeStatusMap[err.code] || 500
    ctx.body = {
        code: err.code || '50000',
        message: err.message || '服务器内部错误',
        result: err.result || ''
    }
}
