const dynamoose = require("dynamoose");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
require("dotenv").config();

const dynamodb = new DynamoDB({ region: process.env.region });
dynamoose.aws.sdk = dynamodb;

const memberSchema = new dynamoose.Schema({
  members: {
    type: Object,
    schema: {
        id: { type: String, required: true },
        role: { type: String, enum: ["admin", "user"], default: "user" },
        created_at: { type: Date, default: Date.now },
    },
  },
});

const teamSchema = new dynamoose.Schema({
  id: { type: String, hashKey: true, index: true },
  name: { type: String, required: true },
  members: {
    type: Array,
    schema: [memberSchema],
  },
  updatedat: { type: Date, default: Date.now },
  createdat: { type: Date, default: Date.now },
});

module.exports = dynamoose.model("Teams", teamSchema);
