const request = require('request');

const db = require('../models');

const auth = require('../controllers/authController');

let getTest = (req,res)=>{
    res.json('IT WORKS!');
}

let getLeagues = (req, res)=>{
    res.json('Leagues Go Here');
}

module.exports.getTest = getTest;
module.exports.getLeagues = getLeagues;