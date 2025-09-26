const Router = require('koa-router')
const {auth} = require("../middleware/auth");
const {create, findAll,update} = require('../controller/order')
const {validator} = require("../middleware/order");

const router = new Router({prefix: '/orders'})


// 生成订单 address_id,goods_info,total
router.post('/', auth, validator({
    address_id: 'int',
    goods_info: 'string',
    total: 'int',
}), create)

// 获取订单列表
router.get('/', auth, findAll)

// 更新订单状态
router.put('/:id', auth, update)

module.exports = router