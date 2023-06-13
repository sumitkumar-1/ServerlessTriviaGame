const Team = require("../models/team.model");
const { v4: uuidv4 } = require("uuid");
const openAIService = require("../utils/openai.service");
const SnsService = require("../utils/sns.service");

const createTeam = async (request, response) => {
  try {
    const { name } = request.body;
    const team = await Team.create({ id: uuidv4(), name, members: [] });
    response.json(team);
  } catch (error) {
    response.status(500).json({ error: "Failed to create a team." });
  }
};

const getTeamById = async (request, response) => {
  try {
    const { id } = request.params;
    const team = await Team.get(id);
    response.json(team);
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch the team." });
  }
};

const getAllTeams = async (request, response) => {
  try {
    const teams = await Team.scan().exec();
    response.json(teams);
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch teams." });
  }
};

const deleteTeam = async (request, response) => {
  try {
    const { id } = request.params;
    await Team.delete(id);
    response.json({ message: "Team deleted successfully." });
  } catch (error) {
    response.status(500).json({ error: "Failed to delete the team." });
  }
};

const generateTeamName = async (request, response) => {
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

    response.json({ teamName: name });
  } catch (error) {
    response.status(500).json({ error: "Failed to generate team name." });
  }
};

const subscribeEmailNotification = async (request, response) => {
  try {
    const { email } = request.body;
    await SnsService.subscribeEmailNotification(email);
    response.json({ message: "Email subscription successful." });
  } catch (error) {
    response
      .status(500)
      .json({ error: "Failed to subscribe for email notification." });
  }
};

const unsubscribeEmailNotification = async (request, response) => {
  try {
    const { email } = request.body;
    await SnsService.unsubscribeEmailNotification(email);
    response.json({ message: "Email unsubscribed successfully." });
  } catch (error) {
    response
      .status(500)
      .json({ error: "Failed to unsubscribe from email notification." });
  }
};

const sendInvite = async (request, response) => {
  try {
    const { teamId } = request.params;
    const { id, addedBy, status, role } = request.body;

    const team = await Team.get(teamId);
    const member = {
      id: id,
      addedBy: addedBy,
      role: role || "user",
      status: status || "pending",
    };
    team.members.push(member);
    await team.save();

    // Send invitation using SNS
    await SnsService.sendInvitation(teamId, member.id, member);

    response.json(team);
  } catch (error) {
    console.error("Error sending invite:", error);
    response.status(500).json({ message: "Failed to send the invite." });
  }
};

const acceptInvite = async (request, response) => {
  try {
    const { teamId, memberId } = request.params;
    const team = await Team.get(teamId);
    const member = team.members.find((m) => m.id === memberId);
    if (member && member.status == "pending") {
      member.status = "accepted";
      await team.save();
      await SnsService.sendInvitation(teamId, member.id, member);
      response.json(team);
    } else {
      response.status(404).json({ error: member.status != "pending" ? "Invalid member status" : "Member not found in the team" });
    }
  } catch (error) {
    response.status(500).json({ error: "Failed to accept the invite." });
  }
};

const rejectInvite = async (request, response) => {
  try {
    const { teamId, memberId } = request.params;
    const team = await Team.get(teamId);
    const member = team.members.find((m) => m.id === memberId);
    if (member && member.status == "pending") {
      member.status = "declined";
      await team.save();
      await SnsService.sendInvitation(teamId, member.id, member);
      response.json(team);
    } else {
      response.status(404).json({ error: member.status != "pending" ? "Invalid member status" : "Member not found in the team" });
    }
  } catch (error) {
    response.status(500).json({ error: "Failed to reject the invite." });
  }
};

const deleteMember = async (request, response) => {
  try {
    const { teamId, memberId } = request.params;
    const team = await Team.get(teamId);
    team.members = team.members.filter((member) => member.id !== memberId);
    await team.save();
    response.json(team);
  } catch (error) {
    response
      .status(500)
      .json({ error: "Failed to delete the member from the team." });
  }
};

const updateMember = async (request, response) => {
  try {
    const { teamId, memberId } = request.params;
    const { role } = request.body;
    const team = await Team.get(teamId);
    const member = team.members.find((m) => m.id === memberId);
    if (member) {
      member.role = role;
      await team.save();
      response.json(team);
    } else {
      response.status(404).json({ error: "Member not found in the team." });
    }
  } catch (error) {
    response
      .status(500)
      .json({ error: "Failed to update the member in the team." });
  }
};

const updateTeamStats = async (request, response) => {
  try {
    const { teamId } = request.params;
    const { gamesPlayed, wins, losses, pointsEarned } = request.body;

    const team = await Team.get(teamId);

    // Update team stats
    team.gamesPlayed = gamesPlayed;
    team.wins = wins;
    team.losses = losses;
    team.pointsEarned = pointsEarned;

    await team.save();
    response.json(team);
  } catch (error) {
    response.status(500).json({ error: "Failed to update team stats." });
  }
};

const getTeamStats = async (request, response) => {
  try {
    const { teamId } = request.params;
    const team = await Team.get(teamId);
    response.json({
      id: teamId,
      gamesPlayed: team.gamesPlayed,
      wins: team.wins,
      losses: team.losses,
      pointsEarned: team.pointsEarned,
    });
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch team stats." });
  }
};

module.exports = {
  createTeam,
  getTeamById,
  getAllTeams,
  deleteTeam,
  generateTeamName,
  sendInvite,
  acceptInvite,
  rejectInvite,
  deleteMember,
  updateMember,
  updateTeamStats,
  getTeamStats,
  subscribeEmailNotification,
  unsubscribeEmailNotification,
};
