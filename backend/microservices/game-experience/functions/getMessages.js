// const AWS = require('aws-sdk');
// const sqs = new AWS.SQS({ region: process.env.region });
// const Chat = require("../models/chat.model");

// const getQueueUrl = async () => {
//     const params = {
//         QueueName: 'ChatQueue'
//     };
//     return new Promise((resolve, reject) => {
//         sqs.getQueueUrl(params, function (err, data) {
//             if (err) {
//                 console.log(err, err.stack);
//                 reject(err);
//             }
//             else {
//                 console.log(data.QueueUrl);
//                 resolve(data.QueueUrl);
//             }
//         });
//     });
// }

// exports.getMessages = async (event, context) => {
//     let queueUrl;
//     let response;

//     try {
//         queueUrl = await getQueueUrl();
//         console.log(queueUrl);
//     } catch (err) {
//         console.error('Could not fetch Queue URL: ', err);
//         response = {
//             statusCode: 500,
//             body: JSON.stringify({ error: 'Internal Server Error. Failed to fetch SQS Queue URL!' })
//         };
//         return response;
//     }

//     const params = {
//         QueueUrl: queueUrl,
//         MaxNumberOfMessages: 10,
//         WaitTimeSeconds: 20 // Long polling period
//     };

//     try {
//         const data = await sqs.receiveMessage(params).promise();

//         if (!data.Messages) {
//             response = {
//                 statusCode: 204,
//                 body: JSON.stringify({ message: 'No new messages' })
//             };
//             return response;
//         }

//         const messages = data.Messages.map(msg => {
//             const messageBody = JSON.parse(msg.Body);
//             return JSON.parse(messageBody.Message);
//         });

//         console.log(messages);

//         // Save chat messages to DynamoDB
//         for (const message of messages) {
//             const chat = new Chat({
//                 chatId: message.chatId,
//                 teamId: message.teamId,
//                 senderId: message.senderId,
//                 senderName: message.senderName,
//                 message: message.message,
//                 timestamp: message.timestamp || Date.now()
//             });
//             await chat.save();
//         }

//         // We need to delete the messages from the queue after reading
//         const deleteParams = {
//             QueueUrl: params.QueueUrl,
//             Entries: data.Messages.map((msg, idx) => ({
//                 Id: idx.toString(),
//                 ReceiptHandle: msg.ReceiptHandle
//             }))
//         };

//         await sqs.deleteMessageBatch(deleteParams).promise();

//         response = {
//             statusCode: 200,
//             body: JSON.stringify({ messages })
//         };
//         return response;

//     } catch (err) {
//         console.error(err);
//         response = {
//             statusCode: 500,
//             body: JSON.stringify({ error: 'Could not fetch messages' })
//         };
//         return response;
//     }
// };

// const getMessagesByTeamId = async (teamId) => {
//     const messages = await Chat.query('teamId').eq(teamId).using('TeamIndex').sort('desc').exec();
//     return messages;
//   };

const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ region: process.env.region });
const Chat = require("../models/chat.model");

const getQueueUrl = async () => {
    const params = {
        QueueName: 'ChatQueue'
    };
    return new Promise((resolve, reject) => {
        sqs.getQueueUrl(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                reject(err);
            }
            else {
                console.log(data.QueueUrl);
                resolve(data.QueueUrl);
            }
        });
    });
}

exports.getMessages = async (event, context) => {
    let queueUrl;
    let response;

    try {
        queueUrl = await getQueueUrl();
        console.log(queueUrl);
    } catch (err) {
        console.error('Could not fetch Queue URL: ', err);
        response = {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error. Failed to fetch SQS Queue URL!' })
        };
        return response;
    }

    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 20 // Long polling period
    };

    try {
        const data = await sqs.receiveMessage(params).promise();

        if (!data.Messages) {
            response = {
                statusCode: 204,
                body: JSON.stringify({ message: 'No new messages' })
            };
            return response;
        }

        const messages = data.Messages.map(msg => {
            const messageBody = JSON.parse(msg.Body);
            return JSON.parse(messageBody.Message);
        });

        console.log(messages);

        // Save chat messages to DynamoDB
        for (const message of messages) {
            const chat = new Chat({
                chatId: message.chatId,
                teamId: message.teamId,
                senderId: message.senderId,
                senderName: message.senderName,
                message: message.message,
                timestamp: message.timestamp || Date.now()
            });
            await chat.save();
        }

        // We need to delete the messages from the queue after reading
        const deleteParams = {
            QueueUrl: params.QueueUrl,
            Entries: data.Messages.map((msg, idx) => ({
                Id: idx.toString(),
                ReceiptHandle: msg.ReceiptHandle
            }))
        };

        await sqs.deleteMessageBatch(deleteParams).promise();
        const { teamId } = event.pathParameters;
        console.log(teamId);
        const teamMessages = await getMessagesByTeamId(teamId);
        console.log(teamMessages);
        response = {
            statusCode: 200,
            body: JSON.stringify({ teamMessages })
        };
        return response;

    } catch (err) {
        console.error(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not fetch messages' })
        };
        return response;
    }
};

const getMessagesByTeamId = async (teamId) => {
    const messages = await Chat.scan('teamId').eq(teamId).exec();
    const sortedMessages = messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    return sortedMessages;
};
