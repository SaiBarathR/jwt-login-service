module.exports = {
    HOST: "",// add your db host here
    USER: "",// add your db user here
    PASSWORD: "",// add your db password here
    DB: "logindata",//
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};