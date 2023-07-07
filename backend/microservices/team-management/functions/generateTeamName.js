const Team = require("../models/team.model");
const openAIService = require("../services/openai.service");

const generateTeamName = async () => {
  try {
    let name;
    let isDuplicate = true;

    while (isDuplicate) {
      name = await openAIService.generateTeamName();
      const existingTeam = await Team.scan("name").eq(name).exec();
      if (existingTeam.length === 0) {
        isDuplicate = false;
      }
    }

    return { teamName: name };
  } catch (error) {
    throw new Error("Failed to generate team name.");
  }
};

module.exports.main = async (event) => {
  try {
    const teamName = await generateTeamName();
    const response = {
      statusCode: 200,
      body: JSON.stringify(teamName),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };

    return response;
  }
};
