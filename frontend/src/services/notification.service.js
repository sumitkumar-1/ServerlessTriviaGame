import api from "./auth.interceptor";

const BASE_URL = `${process.env.REACT_APP_NOTIFICATION_BASE_URL}/notifications/publish`;

const publishNotification = (data) => api.post(`${BASE_URL}/`, data);

export default {
    publishNotification
};