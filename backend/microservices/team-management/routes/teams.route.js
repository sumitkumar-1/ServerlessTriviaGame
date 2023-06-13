const express = require('express');
const router = express.Router();

const TeamController = require('../controllers/teams.controller');
const Auth = require('../middleware/user.auth');

// Team Apis
router.post('/', Auth.verifyAPIUser, TeamController.createTeam);
router.get('/', Auth.verifyAPIUser, TeamController.getAllTeams);
router.get('/:id', Auth.verifyAPIUser, TeamController.getTeamById);
router.delete('/:id', Auth.verifyAPIUser, TeamController.deleteTeam);

// Team Name generator using OpenAi
router.get('/generate/teamName', Auth.verifyAPIUser, TeamController.generateTeamName);

// Invitation Apis
router.post('/:teamId/invites', Auth.verifyAPIUser, TeamController.sendInvite);
router.get('/:teamId/invites/:memberId/accept', Auth.verifyAPIUser, TeamController.acceptInvite);
router.get('/:teamId/invites/:memberId/reject', Auth.verifyAPIUser, TeamController.rejectInvite);

// Team Member Apis
router.delete('/:teamId/members/:memberId', Auth.verifyAPIUser, TeamController.deleteMember);
router.post('/:teamId/members/:memberId', Auth.verifyAPIUser, TeamController.updateMember);

// Team Stats APIs
router.post("/:teamId/stats", Auth.verifyAPIUser, TeamController.updateTeamStats);
router.get("/:teamId/stats", Auth.verifyAPIUser, TeamController.getTeamStats);

// Notification
router.post("/notification/subscribe", Auth.verifyAPIUser, TeamController.subscribeEmailNotification);
router.post("/notification/unsubscribe", Auth.verifyAPIUser, TeamController.unsubscribeEmailNotification);


module.exports = router;