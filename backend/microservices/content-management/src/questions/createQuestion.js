require('dotenv').config();
const { client } = require('../utils/dynamodb');
const axios = require('axios');
const { PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const { isRequestValid } = require('../utils/questionValidation');
const crypto = require('crypto');

async function tagQuestion(question) {
    const url = process.env.TAGGING_API_URL;
    const body = question;
    const config = {
        headers: {
            'Content-Type': 'text/plain',
        },
    };

    try {
        const response = await axios.post(url, body, config);
        return response.data;
    } catch (error) {
        console.error(`Error tagging question:`, error);
        return null;
    }
}


async function createQuestion(questionData) {
    // TODO: Tag question via Fenil's API (Send question string in the request body)
    let tags = await tagQuestion(questionData.question).split("/");
    if (tags) {
        const marshalledItem = marshall(questionData);
        const params = {
            TableName: process.env.DYNAMODB_QUESTIONS_TABLE,
            Item: marshalledItem,
        };

        try {
            await client.send(new PutItemCommand(params));

        } catch (error) {
            console.error("Error creating a new question:", error);
            throw error;
        }
    }
    else {
        tags = ["General", questionData.category];
    }
}

module.exports.main = async (event) => {
    const requestBody = JSON.parse(event.body);

    if (!isRequestValid(requestBody, "create")) {
        return { statusCode: 400, body: "Invalid request format." };
    }

    const questionId = crypto
        .createHash("md5")
        .update(JSON.stringify(requestBody))
        .digest("hex");

    const questionData = {
        ...requestBody,
        questionId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    try {
        await createQuestion(questionData);
        return { statusCode: 200, body: JSON.stringify(questionData) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify(error) };
    }
};