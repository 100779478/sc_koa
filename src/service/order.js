const Order = require("../model/order");

class OrderService {
    /**
     * 创建订单
     * @param params
     * @returns {Promise<params>}
     */
    async createOrder(params) {
        return Order.create(params);
    }

    /**
     * 获取订单列表
     * @param {number} user_id - 用户 ID
     * @param {number} pageNumber - 页码
     * @param {string} pageSize - 每页数量
     * @returns {Promise<{rows: Object[], count: number, pageNumber: number, pageSize: string}>}
     */
    async findAllOrders(user_id, pageNumber, pageSize) {
        const {count, rows} = await Order.findAndCountAll({
            where: {user_id},
            limit: pageSize * 1,
            offset: (pageNumber - 1) * pageSize,
        });
        return {
            rows,
            count,
            pageNumber,
            pageSize,
        };
    }

    /**
     * 更新订单状态
     * @param order_id
     * @param status
     * @returns {Promise<*>}
     */
    async updateOrder(order_id, status) {
        return await Order.update({status}, {
            where: {id: order_id},
        })
    }
}

module.exports = new OrderService()