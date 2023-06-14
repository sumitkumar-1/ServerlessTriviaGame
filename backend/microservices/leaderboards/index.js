const express = require("express");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const leaderboardRouter = require('./routes/leaderboard.route');

app.use('/api/leaderboard', leaderboardRouter);

module.exports = {
  app,
};
