const {Op} = require('sequelize')
const Cart = require('../model/cart')
const Goods = require("../model/goods");

class CartService {
    /**
     * 添加到购物车
     * @param user_id
     * @param goods_id
     * @returns Promise
     */
    async createOrUpdate(user_id, goods_id) {
        let res = await Cart.findOne({
            where: {
                [Op.and]: {
                    user_id,
                    goods_id
                }
            }
        })

        if (res) {
            // 已经存在一条记录,将 number 加1
            await res.increment('number', {by: 1})
            return await res.reload()
        } else {
            return await Cart.create({
                goods_id,
                user_id
            })
        }

    }

    /**
     * 获取购物车列表
     * @param pageNumber
     * @param pageSize
     * @returns list
     */
    async getCartsList(pageNumber, pageSize) {
        const res = await Cart.findAndCountAll({
            attributes: {exclude: ['createdAt', 'updatedAt', 'selected']},
            offset: (pageNumber - 1) * pageSize,
            limit: pageSize * 1,
            include: {
                model: Goods,
                as: 'goods_info',
                attributes: ['id', 'goods_price', 'goods_num', 'goods_img']
            }
        })
        return {
            list: res.rows,
            pageNumber: pageNumber,
            pageSize: pageSize,
            total: res.count,
        }
    }

    /**
     * 更新购物车
     * @param params
     * @returns {Promise<string | import('sequelize').Model>}
     *   - 找不到返回空字符串，成功时返回更新后的 Cart 实例
     */
    async updateCart(params) {
        const {id, number, selected} = params
        const res = await Cart.findByPk(id)
        if (!res) return ''
        number !== undefined ? res.number = number : ''
        selected !== undefined ? res.selected = selected : ''

        return await res.save()
    }

    /**
     * 移除购物车
     * @param ids
     * @returns {Promise<number>}
     */
    async removeCarts(ids) {
        return await Cart.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
    }

    async selectAllCarts(user_id) {
        return await Cart.update({selected: true}, {
            where: {
                user_id
            }
        })
    }

    async unSelectAllCarts(user_id) {
        return await Cart.update({selected: false}, {
            where: {
                user_id
            }
        })
    }
}

module.exports = new CartService()