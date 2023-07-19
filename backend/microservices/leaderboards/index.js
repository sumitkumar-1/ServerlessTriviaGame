const updateLeaderboard = require('./functions/updateLeaderboard');
const getGlobalLeaderboard = require('./functions/getGlobalLeaderboard');
const filterLeaderboardByTimeFrame = require('./functions/filterLeaderboardByTimeFrame');
const getEntityStatistics = require('./functions/getEntityStatistics');
const getLeaderboardByEntityId = require('./functions/getLeaderboardByEntityId');

module.exports = {
  updateLeaderboard: updateLeaderboard.main,
  getGlobalLeaderboard: getGlobalLeaderboard.main,
  filterLeaderboardByTimeFrame: filterLeaderboardByTimeFrame.main,
  getEntityStatistics: getEntityStatistics.main,
  getLeaderboardByEntityId: getLeaderboardByEntityId.main,
};
