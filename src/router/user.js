const Router = require("koa-router");
const router = new Router({prefix: '/users'})

const {register} = require("../controller/user")

// 注册接口
router.post('/register', register)

module.exports = router;