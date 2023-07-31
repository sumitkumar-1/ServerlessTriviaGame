import api from "./auth.interceptor";

const BASE_URL = `${process.env.REACT_APP_NOTIFICATION_BASE_URL}/notifications/publish`;

export const PublishNotification = (data) => api.post(`${BASE_URL}/`, data);