const dotenv = require('dotenv');
dotenv.config();
module.exports = {    
    corsUrls: process.env.CORS_URLS + ',http://localhost'
};