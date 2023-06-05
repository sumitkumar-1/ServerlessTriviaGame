const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openaiClient = new OpenAIApi(configuration);

const generateTeamName = async (context = "act as a trivia game name provider and suggest a one word team name for trivia game, you must reply only word (which is a team name) and nothing else.") => {
    openaiClient.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{role: 'user', content: context}],
    })
    .then((res) => {
        const teamName = res.data.choices[0].message.content;
        console.log("Generated team name: " + teamName); //TODO? Verify if team name is already used
        return teamName;
    })
    .catch((e) => {
        console.log(e);
        return "Error generating teamName";
    });
}

module.exports = {
    generateTeamName
}