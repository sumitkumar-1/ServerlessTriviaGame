const Team = require("./models/team.model");
const SnsService = require("./services/sns.service");

const rejectInvite = async (teamId, memberId) => {
  try {
    const team = await Team.get(teamId);
    const member = team.members.find((m) => m.id === memberId);
    if (member && member.status === "pending") {
      member.status = "declined";
      await team.save();
      await SnsService.sendInvitationNotification("TeamInvitationFailure", {
        teamName: team.name,
        teamId: team.id,
        memberId: member.id,
        email: member.email,
        role: member.role,
        status: member.status,
      });
      return team;
    } else {
      throw new Error(
        member && member.status !== "pending"
          ? "Invalid member status"
          : "Member not found in the team"
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to reject the invite.");
  }
};

module.exports.main = async (event) => {
  try {
    const { teamId, memberId } = event.pathParameters;

    const team = await rejectInvite(teamId, memberId);
    const response = {
      statusCode: 200,
      body: JSON.stringify(team),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: error.message.includes("Invalid member status") ? 400 : 500,
      body: JSON.stringify({ error: error.message }),
    };

    return response;
  }
};
