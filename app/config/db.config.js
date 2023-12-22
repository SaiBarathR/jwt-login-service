const dotenv = require('dotenv');
dotenv.config();

const dialectOptions =

    module.exports = {
        HOST: process.env.DB_HOST,// add your db host here
        USER: process.env.DB_USER,// add your db username here
        PASSWORD: process.env.DB_PASS,// add your db password here
        DB: process.env.DB_NAME,// add your db name here
        dialect: process.env.DB_DIALECT,// add your db name here    
        dialectOptions: process.env.MODE === 'dev' ? {} : {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    };