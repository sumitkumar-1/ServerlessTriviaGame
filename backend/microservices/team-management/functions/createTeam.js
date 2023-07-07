const Team = require("../models/team.model");
const { v4: uuidv4 } = require("uuid");

const createTeam = async (name) => {
  try {
    const team = await Team.create({ id: uuidv4(), name, members: [] });
    return team;
  } catch (error) {
    throw new Error("Failed to create a team.");
  }
};

module.exports.main = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);

    const { name } = requestBody;

    const team = await createTeam(name);
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
