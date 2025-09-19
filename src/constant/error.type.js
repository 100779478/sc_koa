module.exports = {
    userFormateError: {
        code: '10001',
        message: '用户名或密码为空',
        result: ''
    },
    userAlreadyExists: {
        code: '10002',
        message: '用户已存在',
        result: ''
    },
    userRegisterError: {
        code: '10003',
        message: '用户注册失败',
        result: ''
    },
    userDoesNotExists: {
        code: '10004',
        message: '用户不存在',
        result: ''
    },
    userLoginError: {
        code: '10005',
        message: '用户登录失败',
        result: ''
    },
    invalidPassword: {
        code: '10006',
        message: '密码不匹配',
        result: ''
    },
    FailedPassword: {
        code: '10007',
        message: '修改密码失败',
        result: ''
    },
    tokenExpiredError: {
        code: '10101',
        message: 'token 已过期',
        result: ''
    },
    jsonWebTokenExpiredError: {
        code: '10102',
        message: '无效的 token',
        result: ''
    },
    hasNotAdminPermission: {
        code: '10103',
        message: '权限不足',
        result: ''
    },
    FileUploadError: {
        code: '10201',
        message: '图片上传失败',
        result: ''
    },
    FileTypeError: {
        code: '10202',
        message: '不支持的文件格式',
        result: ''
    },
    goodsFormatError: {
        code: '10203',
        message: '商品参数格式校验失败',
        result: ''
    },
    createGoodsFailed: {
        code: '10204',
        message: '添加商品失败',
        result: ''
    },
    goodsIsNotUnique: {
        code: '10205',
        message: '商品名称重复',
        result: ''
    },
    updateGoodsFailed: {
        code: '10206',
        message: '更新商品信息失败',
        result: ''
    },
    removeGoodsFailed: {
        code: '10207',
        message: '删除商品失败',
        result: ''
    },
    canNotFoundGoods: {
        code: '10208',
        message: '商品不存在或已删除',
        result: ''
    },
    canNotFindGoodList: {
        code: '10209',
        message: '获取商品列表失败',
        result: ''
    },
    cartValidatorError: {
        code: '10301',
        message: '购物车参数不符合格式',
        result: ''
    },
    removeCartsFailed: {
        code: '10207',
        message: '删除购物车失败',
        result: ''
    },
}
