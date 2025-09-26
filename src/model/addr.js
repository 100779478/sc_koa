const {DataTypes} = require('sequelize');

const seq = require('../db/seq')

const Addr = seq.define('sc_address', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    consignee: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货人'
    },
    phone: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        comment: '手机号'
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '地址'
    },
    is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: '是否默认地址,0不是1是'
    }
})

Addr.sync({
    force: false,
})

module.exports = Addr;