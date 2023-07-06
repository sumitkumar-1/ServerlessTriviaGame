const express = require('express');
const router = express.Router();

const GameController = require('../controllers/games.controller');
// const Auth = require('../middleware/user.auth');
router.post('/questions/:id/answer',GameController.submitAnswer);
router.get('/questions/:id/answer', GameController.getCorrectAnswer);
router.post('/questions/:id/score',GameController.realTimeScore);
router.get('/users/:id/individualPerformance', GameController.getIndividualScore);
router.get('/users/:id/teamPerformance', GameController.getTeamScore);
router.post('/chat/send', GameController.sendMessage);
router.get('/chat/get', GameController.getMessages);


// router.post('/', Auth.verifyAPIUser, TeamController.createTeam);

module.exports = router;