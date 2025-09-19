const Router = require('koa-router')

const {add, getCarts, update} = require('../controller/cart')
const {auth} = require("../middleware/auth");
const {validator} = require("../middleware/cart");

const router = new Router({prefix: '/cart'})

// 添加到购物车
router.post('/', auth, validator({
    goods_id: 'number',
}), add)

// 获取购物车列表
router.get('/', auth, getCarts)

// 更新购物车
router.patch('/:id', auth, validator({
    number: {
        type: 'number',
        required: false
    },
    selected: {
        type: 'boolean',
        required: false
    }
}), update)

module.exports = router