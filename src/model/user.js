const {DataTypes} = require('sequelize');

const seq = require('../db/seq')

// 定义模型(Model sc_user -> sc_users)
const User = seq.define('sc_user', {
    // id 会被 sequelize 自动创建
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员，0：不是管理员，1：是管理员'
    }
}, {
    // timestamps: false,// 是否生成时间戳
})

// 强制同步数据库 force:true
User.sync({force: false})

module.exports = User