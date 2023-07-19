const Team = require("./models/team.model");

const getAllTeams = async () => {
  try {
    const teams = await Team.scan().exec();
    return teams;
  } catch (error) {
    throw new Error("Failed to fetch teams.");
  }
};

module.exports.main = async (event) => {
  try {
    const teams = await getAllTeams();
    const response = {
      statusCode: 200,
      body: JSON.stringify(teams),
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
