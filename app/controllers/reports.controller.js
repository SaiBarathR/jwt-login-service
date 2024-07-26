const server = require('../../server');
const redisClient = server.redisClient;
const moment = require('moment-timezone');
const timeZone = process.env.TIMEZONE || 'Asia/Kolkata';

exports.getReportsData = async (req, res) => {
    try {
        let todaysDate = moment().tz("Asia/Kolkata").format('YYYYMMDD');
        console.log("todaysDate", todaysDate);
        const types = ['request', 'dialedHour'];
        const data = {};
        for (const type of types) {
            const query = type === "request" ? `kisshit:api:${type}:${todaysDate}` : `kisshit:${type}:request:${todaysDate}`;
            console.log("query used", query);
            data[type] = await redisClient.zRangeWithScores(query, 0, -1, 'WITHSCORES');
        }
        console.log("fetched data successfully");
        res.status(200).send({
            data: data,
            status: 'success'
        });
    } catch (err) {
        console.error("Error fetching data from Redis:", err);
        res.status(500).send({ status: 'error', message: JSON.stringify(err) });
    }
}