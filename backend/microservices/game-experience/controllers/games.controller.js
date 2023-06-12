const express = require('express');
const app = express();
app.use(express.json());

// const admin = require('firebase-admin');
// admin.initializeApp();
// const db = admin.firestore();

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
            },{
                "_id": "2",
                "username": "JaneDoe",
                "password": "hashed_password",
                "email": "jane@example.com",
                "individualScores": 400,
                "performanceStats": {
                    "gamesPlayed": 8,
                    "gamesWon": 4
                }
            },{
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
            },{
                "_id": "5",
                "username": "CharlieBucket",
                "password": "hashed_password",
                "email": "charlie@example.com",
                "individualScores": 350,
                "performanceStats": {
                    "gamesPlayed": 9,
                    "gamesWon": 4
                }
            },{
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
        "category": "Geography"
    },
    {
        "_id": "2",
        "questionText": "What is the smallest planet in the solar system?",
        "answerChoices": ["Mercury", "Venus", "Earth", "Mars"],
        "correctAnswer": "Mercury",
        "hints": ["It's not Earth", "It's the closest planet to the Sun"],
        "explanation": "Mercury is the smallest planet in our solar system.",
        "category": "Astronomy"
    },
    {
        "_id": "3",
        "questionText": "What is the largest animal?",
        "answerChoices": ["Elephant", "Blue Whale", "Tyrannosaurus Rex", "Anaconda"],
        "correctAnswer": "Blue Whale",
        "hints": ["It's a marine animal", "It's larger than any dinosaur"],
        "explanation": "The Blue Whale is the largest animal ever known to have existed.",
        "category": "Biology"
    },
    {
        "_id": "4",
        "questionText": "Who developed the theory of relativity?",
        "answerChoices": ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Thomas Edison"],
        "correctAnswer": "Albert Einstein",
        "hints": ["He's a famous physicist", "He's not Newton or Tesla"],
        "explanation": "Albert Einstein is best known for developing the theory of relativity.",
        "category": "Physics"
    },
    {
        "_id": "5",
        "questionText": "Who wrote 'Pride and Prejudice'?",
        "answerChoices": ["Emily Bronte", "George Eliot", "Jane Austen", "Virginia Woolf"],
        "correctAnswer": "Jane Austen",
        "hints": ["The author is female", "It's not Bronte or Woolf"],
        "explanation": "'Pride and Prejudice' was written by Jane Austen.",
        "category": "Literature"
    }
    // add more questions as needed
];


let chats = [];  // You will probably use some sort of WebSocket connection in real implementation

// API Endpoints

// Submit an answer to a question
const submitAnswer = async (req, res) => {
    const question = questions.find(q => q._id === req.params.id);
    if (!question) return res.status(404).send('Question not found');

    // Check if the provided answer matches the correct answer of the question
    const isCorrect = req.body.answer === question.correctAnswer;

    // Modify the userAnswer field in the question
    question.userAnswer = req.body.answer;

    // Depending on whether the answer is correct or not, return a different response
    if (isCorrect) {
        res.status(200).send('Correct answer');
    } else {
        res.status(200).send('Incorrect answer');
    }
  };


// Get the correct answer and explanation for a question
const getCorrectAnswer = async (req, res) => {
    const question = questions.find(q => q._id === req.params.id);
    if (!question) return res.status(404).send('Question not found');

    res.status(200).json({ correctAnswer: question.correctAnswer, explanation: question.explanation });
  };

// Get real-time team score
// Handle answer submission and update score accordingly
const realTimeScore = async (req, res) => {
    const question = questions.find(q => q._id === req.params.id);
    if (!question) return res.status(404).send('Question not found');
    
    // Fetch the team
    const teamRef = db.collection('teams').doc(req.body.teamId);
    const team = await teamRef.get();

    if (!team.exists) {
        return res.status(404).send('Team not found');
    }

    let teamData = team.data();
    let newScore = teamData.score;

    // If the answer is correct, increment the score
    if (req.body.answer === question.correctAnswer) {
        newScore += question.points; // assuming 'points' attribute for each question
        await teamRef.update({ score: newScore });
    }

    res.status(200).send('Answer processed');
  };

// Send a chat message. In your real implementation, you would probably use some sort of WebSocket connection for this
app.post('/api/chats', (req, res) => {
    chats.push(req.body);
    res.send('Message sent');
});

// Get all chat messages. In your real implementation, you would probably use some sort of WebSocket connection for this
app.get('/api/chats', (req, res) => {
    res.json(chats);
});

// Track individual performance
const getIndivdualScore = async (req, res) => {
    const user = users.find(u => u._id === req.params.id);
    if (!user) return res.status(404).send('User not found');

    res.json(user.individualScores);
  };


// Track team performance
const getTeamScore = async (req, res) => {
    const team = teams.find(t => t._id === req.params.id);
    if (!team) return res.status(404).send('Team not found');

    // Calculate team performance based on the members' performance. This is just a placeholder
    team.performance = calculatePerformance(team);

    res.json({ performance: team.performance });
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

module.exports = {
    submitAnswer,
    getCorrectAnswer,
    realTimeScore,
    getIndivdualScore,
    getTeamScore,
};