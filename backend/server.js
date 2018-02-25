const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const patch = require('path');
// const passport = require('passport');
const router = require('./config/routes');
require('dotenv').config();

const app = express();

  //Only needed if not on Heroku/prod
  if(!process.env.DYNO) {
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:3001");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
      next();
    });
  }

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use('/', router);

app.listen(process.env.PORT || 3030, console.log('Potato server is running on port:', process.env.PORT ||3030));