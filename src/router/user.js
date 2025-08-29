const Router = require("koa-router");
const router = new Router({prefix: '/users'})

const {userValidator, verifyUser, encryptPassword, verifyLogin,} = require('../middleware/user')
const {auth} = require('../middleware/auth')
const {register, login, resetPassword} = require("../controller/user")

// 注册接口
router.post('/register', userValidator, verifyUser, encryptPassword, register)

// 用户登录
router.post('/login', userValidator, verifyLogin, encryptPassword, login)

// 修改密码
router.patch('/', auth, encryptPassword, resetPassword)
module.exports = router;