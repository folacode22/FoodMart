


module.exports = {
    HOST: "localhost",
    PORT: 5300,
    USER:"postgres",
    PASSWORD: "crunchcode",
    DB: "foodie",
    dialect: "postgres",

};


// const Sequelize = require("sequelize");
// module.exports = new Sequelize("foodie", "postgres", "crunchcode", {
//   host: "localhost",
//   dialect: "postgres",

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 3000,
//     idle: 1000,
//   },
// });