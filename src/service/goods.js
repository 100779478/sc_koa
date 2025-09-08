const Goods = require("../model/goods");

class GoodsService {
    /**
     * 创建商品
     * @param goods
     * @returns {Promise<any>}
     */
    async createGoods(goods) {
        const res = await Goods.create(goods)
        return res.dataValues
    }

    /**
     * 更新商品信息
     * @param id
     * @param goods
     * @returns {Promise<boolean>}
     */
    async updateGoods(id, goods) {
        const res = await Goods.update(goods, {
            where: {id},
        })

        return res[0] > 0
    }

    /**
     * 删除商品信息
     * @param id
     * @returns {Promise<boolean>}
     */
    async removeGoods(id) {
        const res = await Goods.destroy({
            where: {id},
        })
        return Boolean(res)
    }

    /**
     * 上架商品
     * @param id
     * @returns {Promise<boolean>}
     */
    async restoreGoods(id) {
        const res = await Goods.restore(id)
        return Boolean(res)
    }

    /**
     * 查询商品信息
     * @param goods_name
     * @returns {Promise<any|null>}
     */
    async getGoods({goods_name}) {
        const whereOpt = {}

        goods_name && Object.assign(whereOpt, {goods_name})
        try {
            const res = await Goods.findOne({
                attributes: ['goods_name', 'goods_price', 'goods_num', 'goods_img'],
                where: whereOpt,
            })
            return res ? res.dataValues : null
        } catch (e) {
            console.error(e)
        }
    }

    /**
     * 查询所有商品列表
     * @param pageNumber
     * @param pageSize
     * @returns {Promise<{dataList: Model<any, TModelAttributes>[], total: Promise<number>, pageNumber, pageSize}>}
     */
    async findAllGoods(pageNumber, pageSize) {
        // 或者可以使用 findAndCountAll 方法
        const count = Goods.count()
        const offset = (pageNumber - 1) * pageSize
        const res = await Goods.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']},
            offset,
            limit: pageSize * 1,
        })

        return {dataList: res, total: count, pageNumber, pageSize}
    }
}

module.exports = new GoodsService();