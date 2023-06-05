const Team = require("../models/team.model");
const { v4: uuidv4 } = require("uuid");
const openAIService = require('../utils/openai.service');

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

const addMember = async (request, response) => {
  try {
    const { id } = request.params;
    const { member } = request.body;
    const team = await Team.get(id);
    team.members.push(member);
    await team.save();
    response.json(team);
  } catch (error) {
    response.status(500).json({ error: "Failed to add member to the team." });
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
    response.status(500).json({ error: "Failed to update the member in the team." });
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

const generateTeamName = async(request, response) => {
  try{
    const name = openAIService.generateTeamName();
    response.json({teamName: name});
  }catch(error) {
    response.status(500).json({error: "Failed to generate team name."});
  }
};

module.exports = {
    createTeam,
    getTeamById,
    getAllTeams,
    addMember,
    deleteMember,
    updateMember,
    deleteTeam,
    generateTeamName
};
