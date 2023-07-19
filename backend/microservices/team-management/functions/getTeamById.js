const Team = require("../models/team.model");

const getTeamById = async (id) => {
  try {
    const team = await Team.get(id);
    return team;
  } catch (error) {
    throw new Error("Failed to fetch the team.");
  }
};

module.exports.main = async (event) => {
  try {
    const { teamId } = event.pathParameters;

    const team = await getTeamById(teamId);
    const response = {
      statusCode: 200,
      body: JSON.stringify(team),
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
