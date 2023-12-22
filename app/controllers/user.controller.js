const db = require("../models");

const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.getUser = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {

        if (!user) {
            console.log("email not found")
            return res.status(404).send({ message: "Email Not found." });
        }
        console.log("user found and response sent")
        res.status(200).send({
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                age: user.age,
                gender: user.gender,
                photo: user.photo,
            },
            status: 'success'
        });

    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: err.message });
    });

}

exports.deleteAccount = (req, res) => {
    const email = req.params.email;
    User.destroy({ where: { email: email } }).then(user => {
        res.status(200).send({
            message: "User deleted successfully!",
            status: 'success'
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}