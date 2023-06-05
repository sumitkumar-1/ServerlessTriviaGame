const express = require("express");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());

const teamRouter = require('./routes/teams.route');

app.use('/api/teams', teamRouter);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
