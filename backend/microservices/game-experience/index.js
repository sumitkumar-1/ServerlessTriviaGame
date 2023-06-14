const express = require("express");
const serverless = require("serverless-http");
const gamesRouter = require('./routes/games.route');
const gamesController = require('./controllers/games.controller');



const app = express();
app.use(express.json());
app.use('/api/games', gamesRouter);
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

const handleChatNotifications = async (event, context) => {
  try {
    // The event object contains details about the SNS notification
    // Parse the SNS message
    // const message = JSON.parse(event.Records[0].Sns.Message);
  
    await gamesController.processEvent(event);

    // Add your logic here for what should happen when a new chat message is published

  } catch (error) {
    // Log the error and return a 500 response
    console.error('Error: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error })
    };
  }
};

module.exports.handler = serverless(app);
module.exports.handleChatNotifications = handleChatNotifications;

