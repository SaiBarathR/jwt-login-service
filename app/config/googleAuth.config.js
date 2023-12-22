const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    API_KEY: process.env.GOOGLE_API_KEY,
}