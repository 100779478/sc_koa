const Router = require('koa-router')
const router = new Router({prefix: '/goods'})

const {auth, hadAdminPermission} = require('../middleware/auth')
const {upload} = require("../controller/goods")
const {validator} = require('../middleware/goods')

// 上传商品图片
router.post('/upload', auth, hadAdminPermission, upload)

// 发布商品接口
router.post('/', auth, hadAdminPermission, validator,
    (ctx, next) => {
        console.log(1111)
        ctx.body = '发布商品成功'
    })

module.exports = router;