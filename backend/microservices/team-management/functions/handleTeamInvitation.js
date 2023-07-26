const SnsService = require("./services/sns.service");

const publishInvitation = async (teamId, userId, addedBy, email, status, role) => {
  try {
    await SnsService.publishTeamInvitation({teamId, userId, addedBy, email, status, role});
  } catch (error) {
    throw new Error("Failed to send the invite.");
  }
};

module.exports.main = async (event) => {
  try {
    const { teamId } = event.pathParameters;
    const { userId, addedBy, email, status, role } = JSON.parse(event.body);

    await publishInvitation(teamId, userId, addedBy, email, status, role);
    const response = {
      statusCode: 200,
      body: JSON.stringify({message: "Invitation sent successfully"}),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send to the team invite topic." }),
    };

    return response;
  }
};
