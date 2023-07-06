const express = require("express");
const serverless = require("serverless-http");
const chatBotRouter = require('./routes/chatbot.route');

const app = express();
app.use(express.json());
app.use('/api/chatBot', chatBotRouter);
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// index.js

const ChatBotController = require('./controllers/chatbot.controller');

module.exports.handler = async (event, context) => {
    console.log(`Received event from Lex: ${JSON.stringify(event)}`);

    const currentIntent = event.currentIntent.name;

    switch (currentIntent) {
        case 'NavigationHelpIntent':
            return await ChatBotController.getNavigationHelp(event);
        case 'ScoreInquiryIntent':
            return await ChatBotController.getScoreInquiry(event, event.currentIntent.slots.TeamName);
        default:
            console.log(`Received unknown intent: ${currentIntent}`);
            return {
                sessionAttributes: {},
                dialogAction: {
                    type: 'ElicitIntent',
                    message: {
                        contentType: 'PlainText',
                        content: 'Sorry, I did not understand. Can you please rephrase?',
                    },
                },
            };
    }
};



module.exports.handler = serverless(app);