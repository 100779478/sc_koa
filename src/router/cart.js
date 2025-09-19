const Router = require('koa-router')

const {add, getCarts, update, remove, selectAll,unSelectAll} = require('../controller/cart')
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

// 删除购物车
router.delete('/', auth, validator({
    ids: {
        type: 'array',
        required: true
    }
}), remove)

// 全选
router.post('/selectAll', auth, selectAll)

// 全不选
router.post('/unSelectAll', auth, unSelectAll)

module.exports = router