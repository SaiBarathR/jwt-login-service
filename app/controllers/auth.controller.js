const db = require("../models");
const config = require("../config/auth.config");
const { OAuth2Client } = require('google-auth-library');
const sign = require("jsonwebtoken/sign");
const googleAuthConfig = require("../config/googleAuth.config.js");
var jwt = require("jsonwebtoken");
const fetch = require('node-fetch');

var bcrypt = require("bcryptjs");
const User = db.user;
const Op = db.Sequelize.Op;
const oAuth2Client = new OAuth2Client(googleAuthConfig.CLIENT_ID, googleAuthConfig.CLIENT_SECRET, 'postmessage');

const generatePass = () => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
    for (let i = 1; i <= 8; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char)
    }
    return pass;
}

const getGooglePeopleAPI = async (access_token, API_KEY) => {
    try {
        const response = await fetch(`https://people.googleapis.com/v1/people/me?personFields=genders%2Cbirthdays&key=${API_KEY}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + access_token },
        });
        return response.json() || response || "No response";
    } catch (err) {
        console.log("getGooglePeopleAPI ~ err", err)
    }
}

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password || generatePass(), 8),
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        photo: req.body.photo ? req.body.photo : null,
    }).then(user => {
        return sign({ id: user.id }, config.secret, { algorithm: 'HS256', allowInsecureKeySizes: true, expiresIn: 86400, }, (err, token) => {
            if (err) {
                console.log(err)
                return res.status(500).send({ message: err.message, status: "error" });
            }
            console.log("user registered successfully")
            res.status(200).send({
                id: user.id,
                email: user.email,
                accessToken: token,
                message: "User was registered successfully!",
                status: 'success'
            });
        });
    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: err.message, status: "error" });
    });
};

exports.signin = (req, res) => {
    User.findOne({ where: { email: req.body.email } }).then(user => {
        if (!user) {
            console.log("email not found")
            return res.status(404).send({ message: "Email Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            (req.body.password),
            user.password
        );
        if (!passwordIsValid) {
            console.log("invalid password")
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        const token = jwt.sign({ id: user.id }, config.secret, { algorithm: 'HS256', allowInsecureKeySizes: true, expiresIn: 86400 });
        console.log("user signed in successfully")
        res.status(200).send({
            id: user.id,
            email: user.email,
            accessToken: token,
            message: "User signed in successfully!",
            status: 'success'
        });
    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: err.message, status: "error" });
    });
};

exports.googleSignIn = async (req, res) => {
    const { tokens } = await oAuth2Client.getToken(req.body.code);
    const { id_token, access_token, refresh_token } = tokens;
    const googlePeopleData = await getGooglePeopleAPI(access_token, googleAuthConfig.API_KEY);
    let gender = googlePeopleData.genders ? googlePeopleData.genders[0].formattedValue : null;
    let age = googlePeopleData.birthdays ? googlePeopleData.birthdays[0].date.year ? new Date().getFullYear() - googlePeopleData.birthdays[0].date.year : null : null;

    oAuth2Client.verifyIdToken({ idToken: id_token, audience: googleAuthConfig.CLIENT_ID }).then(response => {
        const { email_verified, name, email, picture } = response.payload;
        return User.findOne({ where: { email: email } }).then(user => {
            if (!user) {
                User.create({
                    email: email,
                    password: bcrypt.hashSync(generatePass(), 8),
                    name: name,
                    photo: picture,
                    age: age,
                    gender: gender,
                }).then(user => {
                    return res.status(200).send({
                        id: user.id,
                        email: user.email,
                        accessToken: id_token,
                        message: "User was registered successfully!",
                        status: 'success'
                    });
                }).catch(err => {
                    res.status(500).send({ message: err.message, status: "error" });
                });
            } else {
                console.log('user if already existed', user);
                return res.status(200).send({
                    id: user.id,
                    email: user.email,
                    accessToken: id_token,
                    message: "User signed in successfully!",
                    status: 'success'
                });
            }
        }).catch(err => {
            console.log(err);
            return res.status(500).send({ message: err.message, status: "error" });
        }
        );
    }).catch(err => {
        console.log(err);
        return res.status(500).send({ message: err.message, status: "error" });
    });
}
