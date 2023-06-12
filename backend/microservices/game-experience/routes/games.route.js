const express = require('express');
const router = express.Router();

const GameController = require('../controllers/games.controller');
// const Auth = require('../middleware/user.auth');
router.post('/questions/:id/answer',GameController.submitAnswer);
router.get('/questions/:id/answer', GameController.getCorrectAnswer);
router.post('/questions/:id/score',GameController.realTimeScore);
router.get('/users/:id/individualPerformance', GameController.getIndivdualScore);
router.get('/users/:id/teamPerformance', GameController.getTeamScore);

// router.post('/', Auth.verifyAPIUser, TeamController.createTeam);

module.exports = router;