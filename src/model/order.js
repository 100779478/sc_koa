const {DataTypes} = require('sequelize');
const seq = require('../db/seq')

const Order = seq.define('sc_order', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'user_id'
    },
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'address_id'
    },
    goods_info: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'goods_info'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: 'total'
    },
    order_number: {
        type: DataTypes.CHAR(16),
        allowNull: false,
        comment: 'order_number'
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: 'status 0未支付 1已支付 2已发货 3已签收 4取消'
    }
})

Order.sync({force: false})

module.exports = Order