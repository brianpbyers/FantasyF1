const router = require('express').Router();

// const passport = require('passport');

let mainController = require('../controllers/mainController');
let authController = require('../controllers/authController');

router.route('/test')
    .get(mainController.getTest);   

router.route('/signup')
    .post(authController.signup);

router.route('/login')
    .post(authController.login);

router.route('/leagues')
    .get(authController.hasGoodToken, mainController.checkResults, mainController.getLeagues)
    .post(authController.hasGoodToken, mainController.postLeague);

router.route('/league/join')
    .post(authController.hasGoodToken, mainController.joinLeague);

router.route('/teams/:leagueId')
    .get(authController.hasGoodToken, mainController.getTeams);

    //will need middleware for game.  If your team no problem.  If other's team better be after race starts if team 0
router.route('/team/:teamId')
    .get(authController.hasGoodToken, mainController.getTeam)
    .post(authController.hasGoodToken, mainController.postTeam);


module.exports = router;