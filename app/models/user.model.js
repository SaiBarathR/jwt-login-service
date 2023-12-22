module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        photo: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        gender: {
            type: Sequelize.STRING
        },
    });

    return User;
};