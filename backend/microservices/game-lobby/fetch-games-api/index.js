const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();


const corsOptions = {
    origin: '*',
    methods: ['GET', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
const fetchGamesRouter = require('./routes/fetch-games.route');

app.use('/api/fetch-games', fetchGamesRouter);

module.exports.handler = serverless(app);
