const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    secret: process.env.AUTH_SECRET,
    corsUrls: process.env.CORS_URLS
};