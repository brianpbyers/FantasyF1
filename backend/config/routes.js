const router = require('express').Router();

// const passport = require('passport');

let mainController = require('../controllers/mainController');
let authController = require('../controllers/authController');

router.route('/test')
    .get(mainController.getTest);   

router.route('/api/signup')
    .post(authController.signup);

router.route('/api/login')
    .post(authController.login);

router.route('/api/leagues')
    .get(authController.hasGoodToken, mainController.getLeagues)
    .post(authController.hasGoodToken, mainController.postLeague);

router.route('/api/league/join')
    .post(authController.hasGoodToken, mainController.joinLeague);

router.route('/api/teams/:leagueId')
    .get(authController.hasGoodToken, mainController.getTeams)
    .post(authController.hasGoodToken, mainController.postTeam);


module.exports = router;