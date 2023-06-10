import api from "./interceptors";

const USER_AUTH_BASE_URL = process.env.REACT_APP_USER_AUTHENTICATION_BASE_URL;

export const GetUser = () => api.get(`${USER_AUTH_BASE_URL}/getUser`);
export const UpdateUser = (data) => api.post(`${USER_AUTH_BASE_URL}/updateUser`, data);
export const SignOut = () => api.get(`${USER_AUTH_BASE_URL}/signout`);
export const DeleteUser = () => api.get(`${USER_AUTH_BASE_URL}/deleteUser`);
export const QuestionAnswerValidation = (data) => api.post(`${USER_AUTH_BASE_URL}/questionAnswerValidation`, data);