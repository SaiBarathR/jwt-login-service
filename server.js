const express = require("express");
const cors = require("cors");
const redis = require("redis");

const app = express();

const authConfig = require("./app/config/auth.config");

var corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = authConfig.corsUrls.split(',');
        if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the application." });
});


// Redis configuration
const redisConnectionOption = {
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DATABASE
};

console.log("redisConnectionOption", redisConnectionOption);

const redisClient = redis.createClient(redisConnectionOption);

redisClient.on("error", (err) => {
    console.error("Redis error: ", err);
});

redisClient.on("connect", async () => {
    console.log("Connected to Redis");
});

redisClient.connect().then(() => (resp) => {
    console.log("Connected to Redis");
}).catch((err) => {
    console.error("Redis error: ", err);
});

exports.redisClient = redisClient;


require('./app/routes/auth.routes')(app);
require('./app/routes/reports.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});