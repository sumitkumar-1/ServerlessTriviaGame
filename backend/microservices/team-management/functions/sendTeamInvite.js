const Team = require("./models/team.model");
const SnsService = require("./services/sns.service");
const { v4: uuidv4 } = require("uuid");

const sendInvite = async (teamId, userId, addedBy, status, role) => {
  try {
    const team = await Team.get(teamId);
    const member = {
      id: uuidv4(),
      userId: userId,
      addedBy: addedBy,
      role: role || "user",
      status: status || "pending",
    };
    team.members.push(member);
    await team.save();

    // Send invitation using SNS
    await SnsService.sendInvitation(teamId, member.id, member);

    return team;
  } catch (error) {
    throw new Error("Failed to send the invite.");
  }
};

module.exports.main = async (event) => {
  try {
    const { teamId } = event.pathParameters;
    const { userId, addedBy, status, role } = JSON.parse(event.body);

    const team = await sendInvite(teamId, userId, addedBy, status, role);
    const response = {
      statusCode: 200,
      body: JSON.stringify(team),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send the invite." }),
    };

    return response;
  }
};
