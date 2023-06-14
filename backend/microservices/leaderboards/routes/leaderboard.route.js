const express = require('express');
const router = express.Router();

const LeaderboardController = require('../controller/leaderboard.controller');
const Auth = require('../middleware/user.auth');

router.post('/update', Auth.verifyAPIUser, LeaderboardController.updateLeaderboard);
router.get('/getAll', Auth.verifyAPIUser, LeaderboardController.getGlobalLeaderboard);
router.get('/filter/:timeFrame', Auth.verifyAPIUser, LeaderboardController.filterLeaderboardByTimeFrame);
router.get('/statistics/:entityId/:category', Auth.verifyAPIUser, LeaderboardController.getEntityStatistics);
router.get('/entity/:entityId', Auth.verifyAPIUser, LeaderboardController.getLeaderboardByEntityId);

module.exports = router;