const Router = require('koa-router')
const {auth} = require("../middleware/auth");
const {validator} = require("../middleware/addr");
const {add} = require("../controller/addr");


const router = new Router({prefix: '/address'})

// 添加地址
router.post('/', auth, validator({
    consignee: {
        type: 'string',
        required: true,
    },
    phone: {
        type: 'string',
        format: /^1\d{10}$/,
        required: true,
    },
    address: {
        type: 'string',
        required: true,
    }
}), add)

// 获取所有地址

// 修改地址

// 删除地址

module.exports = router