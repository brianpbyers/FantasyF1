const router = require('express').Router();

const passport = require('passport');

let mainController = require('../controllers/mainController');
let authController = require('../controllers/authController');

router.route('/test')
    .get(mainController.getTest);   

// router.route('/signup')
//     .post(authController.signup);

// router.route('/login')
//     .post(authController.login);

router.route('/leagues')
    .get(mainController.getLeagues);

module.exports = router;