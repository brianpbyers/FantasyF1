const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const patch = require('path');
const passport = require('passport');
const router = require('./config/routes');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use('/', router);

app.listen(process.env.PORT || 3030, console.log('Potato server is running on port:', process.env.PORT ||3030));