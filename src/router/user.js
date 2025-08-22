const Router = require("koa-router");
const router = new Router({prefix: '/users'})

const {userValidator, verifyUser} = require('../middleware/user')
const {register} = require("../controller/user")

// 注册接口
router.post('/register', userValidator, verifyUser, register)

module.exports = router;