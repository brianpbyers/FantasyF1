const router = require('express').Router();

const passport = require('passport');

let mainController = require('../controllers/mainController');
let authController = require('../controllers/authController');

router.route('/test')
    .get(mainController.getTest);   

router.route('/api/signup')
    .post(authController.signup);

router.route('/api/login')
    .post(authController.login);

router.route('/api/leagues')
    .get(mainController.getLeagues);

module.exports = router;