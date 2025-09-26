const Router = require('koa-router')
const {auth} = require("../middleware/auth");
const {validator} = require("../middleware/addr");
const {add, findAll, update, remove, setDefault} = require("../controller/addr");


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
router.get('/', auth, findAll)

// 修改地址
router.put('/:id', auth, update)

// 删除地址
router.delete('/:id', auth, remove)

// 默认设置
router.patch('/:id', auth, setDefault)

module.exports = router