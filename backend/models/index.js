const mysql = require('mysql');
require('dotenv').config();

// host:process.env.DB_HOST,
// user:process.env.DB_USER,
// password:process.env.DB_PASSWORD,
// database:process.env.DB_DATABASE,
// port:process.env.DB_PORT
console.log('hello!');
console.log(process.env.DB_HOST);
let connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
});

connection.connect();

// let Constructor = require('./constructor');
// let Driver = require('./driver');
// let League = require('./league');
// let Race = require('./race');
// let Result = require('./result');
// let Team = require('./team');
// let User = require('./user');


module.exports.db = connection;
// module.exports.Constructor = Constructor;
// module.exports.Driver = Driver;
// module.exports.League = League;
// module.exports.Race = Race;
// module.exports.Result = Result;
// module.exports.Team = Team;
// module.exports.User = User;