const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");
const authConfig = require("./app/config/auth.config");

db.sequelize.sync();

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

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});