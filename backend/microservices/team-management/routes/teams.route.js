const express = require('express');
const router = express.Router();

const TeamController = require('../controllers/teams.controller');
const Auth = require('../middleware/user.auth');

router.post('/', Auth.verifyAPIUser, TeamController.createTeam);
router.get('/', Auth.verifyAPIUser, TeamController.getAllTeams);
router.get('/:id', Auth.verifyAPIUser, TeamController.getTeamById);
router.post('/:id/members', Auth.verifyAPIUser, TeamController.addMember);
router.post('/:teamId/members/:memberId', Auth.verifyAPIUser, TeamController.deleteMember);
router.post('/:teamId/members/:memberId', Auth.verifyAPIUser, TeamController.updateMember);
router.delete('/:id', Auth.verifyAPIUser, TeamController.deleteTeam);
router.get('/generateTeamName', Auth.verifyAPIUser, TeamController.generateTeamName);

module.exports = router;