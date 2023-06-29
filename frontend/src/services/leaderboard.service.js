import api from "./auth.interceptor";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_LEADERBOARD_BASE_URL}/api/leaderboard`;

const updateLeaderboard = (data) => api.post(`${BASE_URL}/update`, data);
const getGlobalLeaderboard = () => axios.get(`${BASE_URL}/getAll`);
const filterLeaderboardByTimeFrame = (timeFrame) => api.get(`${BASE_URL}/filter/${timeFrame}`);
const getEntityStatistics = (entityId, category) => api.get(`${BASE_URL}/statistics/${entityId}/${category}`);
const getLeaderboardByEntityId = (entityId) => api.get(`${BASE_URL}/entity/${entityId}`);

export default {
    updateLeaderboard,
    getGlobalLeaderboard,
    filterLeaderboardByTimeFrame,
    getEntityStatistics,
    getLeaderboardByEntityId
};
