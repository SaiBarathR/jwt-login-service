const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const config = require("../config/auth.config.js");
const googleAuthConfig = require("../config/googleAuth.config.js");
const db = require("../models");
const User = db.user;
const oAuth2Client = new OAuth2Client(googleAuthConfig.CLIENT_ID, googleAuthConfig.CLIENT_SECRET, 'postmessage',);

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    console.log("trying auth ", 'body: ', req.body.type, 'params: ', req.params.type)
    if (!token) {
        return res.status(403).send({
            message: "No token provided!, unauthorized access to the resource due to invalid authentication credentials sent by the client.",
            status: "failed"
        });
    }
    const type = req.body.type || req.params.type;
    if (type === 'google') {
        oAuth2Client.verifyIdToken({
            idToken: token,
            audience: googleAuthConfig.CLIENT_ID,
        }).then((ticket) => {
            const payload = ticket.getPayload();
            console.log("auth success")
            next();
        }).catch((err) => {
            console.log("auth failed")
            return res.status(401).send({
                message: "Unauthorized!",
                status: "failed"
            });
        });
    }
    if (type === 'manual' || type === undefined || type === null) {
        jwt.verify(token,
            config.secret,
            (err, decoded) => {
                if (err) {
                    console.log("auth failed")
                    return res.status(401).send({
                        message: "Unauthorized!",
                    });
                }
                console.log("auth success")
                req.userId = decoded.id;
                next();
            });
    }
};

const authJwt = { verifyToken: verifyToken };
module.exports = authJwt;