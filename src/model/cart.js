const {DataTypes} = require('sequelize');

const seq = require('../db/seq')

const Goods = require('../model/goods')

const Cart = seq.define('sc_cart', {
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品id'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '商品数量'
    },
    selected: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: '是否选中'
    }
})

// 强制同步数据库 force:true
Cart.sync({force: false})
// 关联表
Cart.belongsTo(Goods, {
    foreignKey: 'goods_id', // 外键id
    as: 'goods_info', // 查询别名
})

module.exports = Cart