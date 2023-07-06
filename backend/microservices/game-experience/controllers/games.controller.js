const express = require('express');
const app = express();
app.use(express.json());
const AWS = require('aws-sdk');
const Chat = require("../models/chat.model");
const { v4: uuidv4 } = require("uuid");
const sqs = new AWS.SQS({ region: process.env.region });
const SnsService = require("../utils/sns.service");

// Mock data
let users = [
    {
        "_id": "1",
        "username": "JohnDoe",
        "password": "hashed_password",
        "email": "john@example.com",
        "individualScores": 500,
        "performanceStats": {
            "gamesPlayed": 10,
            "gamesWon": 5
        }
    },
    {
        "_id": "2",
        "username": "JaneDoe",
        "password": "hashed_password",
        "email": "jane@example.com",
        "individualScores": 400,
        "performanceStats": {
            "gamesPlayed": 8,
            "gamesWon": 4
        }
    },
    {
        "_id": "3",
        "username": "BobSmith",
        "password": "hashed_password",
        "email": "bob@example.com",
        "individualScores": 550,
        "performanceStats": {
            "gamesPlayed": 15,
            "gamesWon": 7
        }
    },
    {
        "_id": "4",
        "username": "AliceJohnson",
        "password": "hashed_password",
        "email": "alice@example.com",
        "individualScores": 600,
        "performanceStats": {
            "gamesPlayed": 12,
            "gamesWon": 6
        }
    },
    {
        "_id": "5",
        "username": "CharlieBrown",
        "password": "hashed_password",
        "email": "charlie@example.com",
        "individualScores": 450,
        "performanceStats": {
            "gamesPlayed": 9,
            "gamesWon": 3
        }
    },
    {
        "_id": "6",
        "username": "DianaPrince",
        "password": "hashed_password",
        "email": "diana@example.com",
        "individualScores": 600,
        "performanceStats": {
            "gamesPlayed": 18,
            "gamesWon": 8
        }
    }
    // Add more users as needed...
];


let teams = [
    {
        "_id": "1",
        "teamName": "The Quizzards",
        "members": [
            {
                "_id": "1",
                "username": "JohnDoe",
                "password": "hashed_password",
                "email": "john@example.com",
                "individualScores": 500,
                "performanceStats": {
                    "gamesPlayed": 10,
                    "gamesWon": 5
                }
            }, {
                "_id": "2",
                "username": "JaneDoe",
                "password": "hashed_password",
                "email": "jane@example.com",
                "individualScores": 400,
                "performanceStats": {
                    "gamesPlayed": 8,
                    "gamesWon": 4
                }
            }, {
                "_id": "3",
                "username": "BobSmith",
                "password": "hashed_password",
                "email": "bob@example.com",
                "individualScores": 550,
                "performanceStats": {
                    "gamesPlayed": 15,
                    "gamesWon": 7
                }
            }
        ],
        "teamScores": 5000
    },
    {
        "_id": "2",
        "teamName": "Brainiacs",
        "members": [
            {
                "_id": "4",
                "username": "AliceWonder",
                "password": "hashed_password",
                "email": "alice@example.com",
                "individualScores": 300,
                "performanceStats": {
                    "gamesPlayed": 5,
                    "gamesWon": 2
                }
            }, {
                "_id": "5",
                "username": "CharlieBucket",
                "password": "hashed_password",
                "email": "charlie@example.com",
                "individualScores": 350,
                "performanceStats": {
                    "gamesPlayed": 9,
                    "gamesWon": 4
                }
            }, {
                "_id": "6",
                "username": "DianaPrince",
                "password": "hashed_password",
                "email": "diana@example.com",
                "individualScores": 600,
                "performanceStats": {
                    "gamesPlayed": 18,
                    "gamesWon": 8
                }
            }
        ],
        "teamScores": 5200
    },
    // More teams...
];


let questions = [
    {
        "_id": "1",
        "questionText": "What is the capital of France?",
        "answerChoices": ["Paris", "London", "Rome", "Berlin"],
        "correctAnswer": "Paris",
        "hints": ["It's in Europe", "It's known as the City of Light"],
        "explanation": "Paris is the capital and most populous city of France.",
        "category": "Geography",
        "points":10
    },
    {
        "_id": "2",
        "questionText": "What is the smallest planet in the solar system?",
        "answerChoices": ["Mercury", "Venus", "Earth", "Mars"],
        "correctAnswer": "Mercury",
        "hints": ["It's not Earth", "It's the closest planet to the Sun"],
        "explanation": "Mercury is the smallest planet in our solar system.",
        "category": "Astronomy",
        "points":10
    },
    {
        "_id": "3",
        "questionText": "What is the largest animal?",
        "answerChoices": ["Elephant", "Blue Whale", "Tyrannosaurus Rex", "Anaconda"],
        "correctAnswer": "Blue Whale",
        "hints": ["It's a marine animal", "It's larger than any dinosaur"],
        "explanation": "The Blue Whale is the largest animal ever known to have existed.",
        "category": "Biology",
        "points":10
    },
    {
        "_id": "4",
        "questionText": "Who developed the theory of relativity?",
        "answerChoices": ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Thomas Edison"],
        "correctAnswer": "Albert Einstein",
        "hints": ["He's a famous physicist", "He's not Newton or Tesla"],
        "explanation": "Albert Einstein is best known for developing the theory of relativity.",
        "category": "Physics",
        "points":10
    },
    {
        "_id": "5",
        "questionText": "Who wrote 'Pride and Prejudice'?",
        "answerChoices": ["Emily Bronte", "George Eliot", "Jane Austen", "Virginia Woolf"],
        "correctAnswer": "Jane Austen",
        "hints": ["The author is female", "It's not Bronte or Woolf"],
        "explanation": "'Pride and Prejudice' was written by Jane Austen.",
        "category": "Literature",
        "points":10
    }
    // add more questions as needed
];



let chats = [];  // You will probably use some sort of WebSocket connection in real implementation

// API Endpoints

// Submit an answer to a question
const submitAnswer = async (req, res) => {
    try {
        const question = questions.find(q => q._id === req.params.id);
        if (!question) return res.status(404).send({ message: 'Question not found' });

        const isCorrect = req.body.answer === question.correctAnswer;
        res.status(200).send({
            message: isCorrect ? 'Correct answer' : 'Incorrect answer',
            isCorrect: isCorrect,
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error. Failed to submit Answer !!', error: error });
    }
};


// Get the correct answer and explanation for a question
const getCorrectAnswer = async (req, res) => {
    try {
        const question = questions.find(q => q._id === req.params.id);
        if (!question) return res.status(404).send({ message: 'Question not found' });

        res.status(200).json({
            correctAnswer: question.correctAnswer,
            explanation: question.explanation
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error. Failed to get answers Explaination !!', error: error });
    }
};

// Get real-time team score
// Handle answer submission and update score accordingly
// const realTimeScore = async (req, res) => {
//     try {
//         const question = questions.find(q => q._id === req.params.id);
//         if (!question) return res.status(404).send({ message: 'Question not found' });

//         // const teamRef = db.collection('teams').doc(req.body.teamId);
//         // const team = await teamRef.get();
//         const team = teams.find(t => t._id === req.body.teamId);
//         if (!team.exists) {
//             return res.status(404).send({ message: 'Team not found' });
//         }

//         // let teamData = team.data();
//         let newScore = team.teamScores;
//         console.log(teamData);
//         console.log(newScore);
        
//         if (req.body.answer === question.correctAnswer) {
//             newScore += question.points; // assuming 'points' attribute for each question
//             await teamRef.update({ score: newScore });
//         }

//         console.log(newScore);

//         res.status(200).send({ message: 'Answer processed', newScore: newScore });
//     } catch (error) {
//         res.status(500).send({ message: 'Internal Server Error. Not Able to fetch Real Time Score !!', error: error });
//     }
// };
const realTimeScore = async (req, res) => {
    try {
        const question = questions.find(q => q._id === req.params.id);
        if (!question) return res.status(404).send({ message: 'Question not found' });

        const team = teams.find(t => t._id === req.body.teamId);
        if (!team) {
            return res.status(404).send({ message: 'Team not found' });
        }

        let newScore = team.teamScores;
        console.log(team);
        console.log(newScore);
        
        if (req.body.answer === question.correctAnswer) {
            newScore += question.points; // assuming 'points' attribute for each question
            // Update the score directly in the object
            team.teamScores = newScore;
        }

        console.log(newScore);

        res.status(200).send({ message: 'Answer processed', newScore: newScore });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error. Not Able to fetch Real Time Score !!', error: error });
    }
};



// Track individual performance
const getIndividualScore = async (req, res) => {
    try {
        const user = users.find(u => u._id === req.params.id);
        if (!user) return res.status(404).send({ message: 'User not found' });

        res.status(200).json({ individualScores: user.individualScores });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error.', error: error });
    }
};


// Track team performance
const getTeamScore = async (req, res) => {
    try {
        const team = teams.find(t => t._id === req.params.id);
        if (!team) return res.status(404).send({ message: 'Team not found' });

        // Calculate team performance based on the members' performance. This is just a placeholder
        team.performance = calculatePerformance(team);

        res.status(200).json({ performance: team.performance });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error.', error: error });
    }
};


// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}`));

// // Placeholder functions
// function calculateScore(team) {
//     // This is just a placeholder. Replace with actual calculation logic
//     return Math.floor(Math.random() * 100);
// }

function calculatePerformance(team) {
    // This is just a placeholder. Replace with actual calculation logic
    return Math.floor(Math.random() * 100);
}


const sendMessage = async (req, res) => {
    try {
        // Extract message details from the req object
        const { teamId, senderId, message } = req.body;

        // TODO: Validate teamId, senderId, and message here
        // You may need to query DynamoDB to check if the sender is part of the team

        // Prepare a unique chatId and timestamp
        const chatId = uuidv4();
        const timestamp = Date.now();

        // Prepare the chat message
        const chatMessage = new Chat({ chatId, teamId, senderId, message, timestamp, });

        // Find team with given teamId
        const team = teams.find(t => t._id === teamId);

        // Make sure the team exists
        if (!team) {
            throw new Error("Team not found");
        }

        // Publish the chat message to the corresponding SNS topic
        await SnsService.sendMessages(chatId, teamId, senderId, message, timestamp,);

        // Return a success response
        res.status(200).send({ chatMessage });
    } catch (error) {
        // Handle any errors that occurred while publishing to SNS
        console.error('Error: ', error);
        res.status(500).send({ message: 'Internal Server Error. Failed to send message!', error: error, });
    }
};


const getMessages = async (req, res) => {
    let queueUrl;

    try {
        queueUrl = await getQueueUrl();
        console.log(queueUrl);
    } catch (err) {
        console.error('Could not fetch Queue URL: ', err);
         res.status(500).json({
            error: 'Internal Server Error. Failed to fetch SQS Queue URL!'
        });
    }
    const params = {
        QueueUrl: queueUrl, // Replace with your Queue URL
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 20 // Long polling period
    };

    try {
        const data = await sqs.receiveMessage(params).promise();

        if (!data.Messages) {
             res.status(204).json({ message: 'No new messages' });
        }

        const messages = data.Messages.map(msg => JSON.parse(JSON.parse(msg.Body).Message));

        console.log(messages);

        // We need to delete the messages from the queue after reading
        const deleteParams = {
            QueueUrl: params.QueueUrl,
            Entries: data.Messages.map((msg, idx) => ({
                Id: idx.toString(),
                ReceiptHandle: msg.ReceiptHandle
            }))
        };

        await sqs.deleteMessageBatch(deleteParams).promise();

         res.status(200).json({ messages });
    } catch (err) {
        console.error(err);
         res.status(500).json({ error: 'Could not fetch messages' });
    }
};


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



module.exports = {
    submitAnswer,
    getCorrectAnswer,
    realTimeScore,
    getIndividualScore,
    getTeamScore,
    sendMessage,
    getMessages
};