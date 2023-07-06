const AWS = require('aws-sdk');

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
    {
        "_id": "3",
        "teamName": "Fact Hunters",
        "members": [
            {
                "_id": "7",
                "username": "EthanHunt",
                "password": "hashed_password",
                "email": "ethan@example.com",
                "individualScores": 450,
                "performanceStats": {
                    "gamesPlayed": 12,
                    "gamesWon": 6
                }
            }, {
                "_id": "8",
                "username": "FionaApple",
                "password": "hashed_password",
                "email": "fiona@example.com",
                "individualScores": 500,
                "performanceStats": {
                    "gamesPlayed": 11,
                    "gamesWon": 5
                }
            }, {
                "_id": "9",
                "username": "GeorgeOrwell",
                "password": "hashed_password",
                "email": "george@example.com",
                "individualScores": 550,
                "performanceStats": {
                    "gamesPlayed": 13,
                    "gamesWon": 7
                }
            }
        ],
        "teamScores": 5400
    },
    {
        "_id": "4",
        "teamName": "Trivia Champs",
        "members": [
            {
                "_id": "10",
                "username": "HannahMontana",
                "password": "hashed_password",
                "email": "hannah@example.com",
                "individualScores": 480,
                "performanceStats": {
                    "gamesPlayed": 14,
                    "gamesWon": 7
                }
            }, {
                "_id": "11",
                "username": "IndianaJones",
                "password": "hashed_password",
                "email": "indiana@example.com",
                "individualScores": 500,
                "performanceStats": {
                    "gamesPlayed": 16,
                    "gamesWon": 8
                }
            }, {
                "_id": "12",
                "username": "JackSparrow",
                "password": "hashed_password",
                "email": "jack@example.com",
                "individualScores": 520,
                "performanceStats": {
                    "gamesPlayed": 17,
                    "gamesWon": 9
                }
            }
        ],
        "teamScores": 5500
    }
    
    // More teams...
];


const getNavigationHelp = async (event) => {
    // Implement your logic here to provide navigation help.
    // You can access the user's input using event.inputTranscript
    // The response should be in the format expected by AWS Lex.
    return {
        sessionAttributes: event.sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState: 'Fulfilled',
            message: {
                contentType: 'PlainText',
                content: 'Here are the steps to navigate...' // Replace with your navigation steps
            },
        }
    };
};

const getScoreInquiry = async (event, teamName) => {
    // Implement your logic here to provide score inquiry.
    // You can access the team name using teamName.
    // You may need to query DynamoDB to get the team's score.
    // The response should be in the format expected by AWS Lex.
    const teamScore = teams.find(team => team.teamName === teamName)?.teamScores;
    
    if (!teamScore) {
        return {
            sessionAttributes: event.sessionAttributes,
            dialogAction: {
                type: 'Close',
                fulfillmentState: 'Fulfilled',
                message: {
                    contentType: 'PlainText',
                    content: `I'm sorry, I couldn't find the team ${teamName}.`
                },
            }
        };
    }

    return {
        sessionAttributes: event.sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState: 'Fulfilled',
            message: {
                contentType: 'PlainText',
                content: `The score for team ${teamName} is ${teamScore}.`
            },
        }
    };
};

module.exports = {
    getNavigationHelp,
    getScoreInquiry
};
