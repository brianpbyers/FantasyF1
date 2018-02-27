const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
// const passport = require('passport');
const router = require('./config/routes');
require('dotenv').config();

const app = express();

  //things I KNOW I will need to change when hosting:
  //remove the access-control-allow-origin
  //.env file variables need to be changed to match host's mysql variables
  //index.js will need to adjust for same reason
  //remove 3030 below
  //authforms, leagues, and teams in front end need to be fixed prior tobuild
  //put all of the goodies into a dist folder on front end
  //Only needed if not on Heroku/prod
  // if(!process.env.DYNO) {
  //   app.use(function(req, res, next) {
  //     res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  //     res.header("Access-Control-Allow-Credentials", "true");
  //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  //     res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  //     next();
  //   });
  // }

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));
app.use('/', router);

app.listen(process.env.PORT || 3030, console.log('Potato server is running on port:', process.env.PORT ||3030));