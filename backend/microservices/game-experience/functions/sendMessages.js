const AWS = require("aws-sdk");
const SnsService = require("../utils/sns.service");
const Chat = require("../models/chat.model");
const { v4: uuidv4 } = require("uuid");
const { getTeamById } = require("../utils/external.service");

exports.sendMessages = async (event, context) => {
    let team = null;
    let response;
    try {
      // Extract message details from the event object
      const { teamId, senderId, senderName, message } = JSON.parse(event.body);
  
      // Prepare a unique chatId and timestamp
      const chatId = uuidv4();
      const timestamp = Date.now();
  
      // Prepare the chat message
      const chatMessage = new Chat({ chatId, teamId, senderId, senderName, message, timestamp });
  
      team = await getTeamById(teamId);
      // // Find team with given teamId
      // const team = teams.find(t => t.id === teamId);
  
      // Make sure the team exists
      if (!team) {
        throw new Error("Team not found");
      }
  
      // Validate senderId
      const senderIsMember = team.members.some(member => member.userId === senderId);
      if (!senderIsMember) {
        throw new Error("Sender is not a member of the team");
      }
  
      // Publish the chat message to the corresponding SNS topic
      await SnsService.sendMessages(chatId, teamId, senderId, senderName, message, timestamp);
  
      // Return a success response
      response = {
        statusCode: 200,
        body: JSON.stringify({ chatMessage }),
      };
      return response;
    } catch (error) {
      // Handle any errors that occurred while publishing to SNS
      console.error('Error: ', error);
      response = {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error. Failed to send message!', error: error }),
      };
      return response;
    }
};
