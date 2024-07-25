const server = require('../../server');
const redisClient = server.redisClient;

exports.getReportsData = async (req, res) => {
    try {
        const todaysDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        console.log("todaysDate", todaysDate);
        const types = ['request', 'queued'];
        const data = {};
        for (const type of types) {
            const query = type === "request" ? `kisshit:api:${type}:${todaysDate}` : `kisshit:api:ivr:${type}:${todaysDate}`;
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
