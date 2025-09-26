const Address = require("../model/addr");

class AddrService {
    /**
     * 添加地址
     * @param user_id
     * @param params
     * @returns {Promise<Model<any, TModelAttributes>>}
     */
    async addAddress(user_id, params) {
        return await Address.create({user_id, ...params});
    }

    /**
     * 获取所有地址列表
     * @param user_id
     * @returns {Promise<Model<any, TModelAttributes>[]>}
     */
    async findAllAddr(user_id) {
        return await Address.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
            where: {user_id}
        })
    }

    /**
     * 更新地址
     * @param user_id
     * @param id
     * @param params
     * @returns {Promise<*>}
     */
    async updateAddr(user_id, id, params) {
        const res = await Address.update(params, {where: {id, user_id}})
        return res[0]
    }

    /**
     * 删除地址
     * @param user_id
     * @param id
     * @returns {Promise<boolean>}
     */
    async removeAddr(user_id, id) {
        const res = await Address.destroy({
            where: {user_id, id}
        })
        return res === 1
    }

    /**
     * 设置默认地址
     * @param user_id
     * @param id
     * @returns {Promise<*>}
     */
    async setDefaultAddr(user_id, id) {
        await Address.update({is_default: false}, {
            where: {user_id}
        })
        return await Address.update({is_default: true}, {
            where: {id}
        })
    }
}

module.exports = new AddrService()