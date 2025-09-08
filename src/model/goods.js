const {DataTypes} = require('sequelize');

const seq = require('../db/seq')

const Goods = seq.define('sc_good', {
    // goods_id: {
    //     type: DataTypes.NUMBER,
    //     allowNull: false,
    //     unique: true,
    //     comment: '商品id (唯一标识)'
    // },
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '商品名称'
    },
    goods_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '商品价格'
    },
    goods_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品库存数量'
    },
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片'
    },
}, {
    paranoid: true
})

// 强制同步数据库 force:true
// Goods.sync({force: true})

module.exports = Goods;