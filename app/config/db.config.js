const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    HOST: process.env.DB_HOST,// add your db host here
    USER: process.env.DB_USER,// add your db username here
    PASSWORD: process.env.DB_PASS,// add your db password here
    DB: "logindata", // add your db name here
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};