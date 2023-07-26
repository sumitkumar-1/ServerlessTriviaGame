const AWS = require("aws-sdk");

const sns = new AWS.SNS({ region: process.env.region });

const sendMessages = async (chatId,
    teamId,
    senderId,
    senderName,
    message,
    timestamp,) => {
  try { 
    const chat = {
        chatId,
        teamId,
        senderId,
        senderName,
        message,
        timestamp,
    };
    const snsParams = {
      Message: JSON.stringify(chat),
      TopicArn: process.env.SNS_TOPIC_ARN,
    };
    await sns.publish(snsParams).promise();
  } catch (error) {
    console.log("Error publishing message");
    throw error;
  }
};


module.exports = {
    sendMessages,
};
