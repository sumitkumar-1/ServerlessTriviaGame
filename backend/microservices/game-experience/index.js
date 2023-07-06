const express = require("express");
const serverless = require("serverless-http");
const gamesRouter = require('./routes/games.route');




const app = express();
app.use(express.json());
app.use('/api/games', gamesRouter);
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);




