const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    APP_PORT: process.env.APP_PORT || 3000,
    MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
    MYSQL_PORT: process.env.MYSQL_PORT,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PWD: process.env.MYSQL_PWD,
    MYSQL_DB: process.env.MYSQL_DB,
    JWT_SECRET: process.env.JWT_SECRET,
};
