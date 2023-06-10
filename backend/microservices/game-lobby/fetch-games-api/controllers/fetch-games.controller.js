require('dotenv').config()
const app = require('../utils/firebase');

const getTriviaGames = async (event, context) => {
    try {
        const gamesSnapshot = await app.firestore().collection('games').get();

        const games = [];
        gamesSnapshot.forEach((gameDoc) => {
            const game = gameDoc.data();
            games.push(game);
        });
        return {
            statusCode: 200,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,GET"
            },
            body: JSON.stringify(games)
        };
    } catch (error) {
        console.error('Error fetching trivia games:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error', error: error})
        };
    }
};

module.exports = { getTriviaGames };
