const User = require('../model/user')

class UserService {
    /**
     * 创建用户，新增一条到数据库
     * @param user_name
     * @param password
     * @returns {Promise<any>}
     */
    async createUser(user_name, password) {
        // 写入数据库
        const res = await User.create({
            user_name,
            password
        })
        return res.dataValues
    }

    /**
     * 更新用户信息
     * @param id
     * @param user_name
     * @param password
     * @param is_admin
     * @returns {Promise<boolean>}
     */
    async updateById({id, user_name, password, is_admin}) {
        const whereOpt = {id}
        const newUser = {}
        user_name && Object.assign(newUser, {user_name})
        password && Object.assign(newUser, {password})
        is_admin && Object.assign(newUser, {is_admin})
        // 更新数据
        const res = await User.update(newUser, {
            where: whereOpt,
        })
        return res[0] > 0
    }

    /**
     * 查找数据库中对应的用户数据
     * @param id
     * @param user_name
     * @param password
     * @param is_admin
     * @returns {Promise<any|null>}
     */
    async getUserInfo({id, user_name, password, is_admin}) {
        const whereOpt = {}

        id && Object.assign(whereOpt, {id})
        user_name && Object.assign(whereOpt, {user_name})
        password && Object.assign(whereOpt, {password})
        is_admin && Object.assign(whereOpt, {is_admin})

        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt,
        })

        return res ? res.dataValues : null
    }
}

module.exports = new UserService()