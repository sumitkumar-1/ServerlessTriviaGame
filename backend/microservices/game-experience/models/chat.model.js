const dynamoose = require("dynamoose");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
require("dotenv").config();




// Initialize a DynamoDB client instance
const dynamodb = new DynamoDB({
  region: process.env.region,
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    sessionToken: process.env.sessionToken
  }
});

dynamoose.aws.sdk = dynamodb;

// Define a schema for chat messages
const chatSchema = new dynamoose.Schema({
  chatId: { type: String, hashKey: true, required: true, index: true }, // The primary key of the Chat table
  teamId: { type: String, required: true }, // The team where the chat message was sent
  senderId: { type: String, required: true }, // The sender of the chat message
  message: { type: String, required: true }, // The chat message
  timestamp: { type: Date, default: Date.now }, // The time the message was sent
});

// Create a Chat model using the schema
const Chat = dynamoose.model("Chat", chatSchema);

module.exports = Chat;




// const dynamoose = require('dynamoose');
// const AWS = require("aws-sdk");
// var dynamodbOfflineOptions = {
//     region: "localhost",
//     endpoint: "http://localhost:8000"
// },
// isOffline = () => process.env.IS_OFFLINE;

// var client = isOffline() ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions) :  new AWS.DynamoDB.DocumentClient();
// console.log(client);
// // Check if running offline
// // if (process.env.IS_OFFLINE) {
// //     console.log("Hello1");
// //     dynamoose.aws.ddb.local("http://localhost:8000");// pointing to local DynamoDB instance
// // } else {
// //     console.log("Hello2");
// //   dynamoose.aws.sdk.config.update({ region: process.env.REGION }); // Update AWS SDK configuration
// // }

// // Define a schema for chat messages
// const chatSchema = new dynamoose.Schema({
//   chatId: { type: String, hashKey: true, required: true, index: true }, // The primary key of the Chat table
//   teamId: { type: String, required: true }, // The team where the chat message was sent
//   senderId: { type: String, required: true }, // The sender of the chat message
//   message: { type: String, required: true }, // The chat message
//   timestamp: { type: Date, default: Date.now }, // The time the message was sent
// });


// // Create a Chat model using the schema
// const Chat = dynamoose.model("Chat", chatSchema);

// module.exports = Chat;

