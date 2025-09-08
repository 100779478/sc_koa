const Router = require('koa-router')
const router = new Router({prefix: '/goods'})

const {auth, hadAdminPermission} = require('../middleware/auth')
const {upload, create, update, remove, restore, findAll} = require("../controller/goods")
const {validator, checkGoodsUnique} = require('../middleware/goods')

// 上传商品图片
router.post('/upload', auth, hadAdminPermission, upload)

// 发布商品接口
router.post('/', auth, hadAdminPermission, validator, checkGoodsUnique, create)

// 编辑商品接口
router.put('/:id', auth, hadAdminPermission, validator, checkGoodsUnique, update)

// 硬删除商品接口
router.delete('/:id', auth, hadAdminPermission, remove)

// 下架商品接口
router.post('/:id/off', auth, hadAdminPermission, remove)

// 上架商品接口
router.post('/:id/on', auth, hadAdminPermission, restore)

// 商品列表接口
router.get('/', auth, hadAdminPermission, findAll)

module.exports = router;