import axios from "axios";

const USER_AUTH_BASE_URL = process.env.REACT_APP_USER_AUTHENTICATION_BASE_URL;

export const CreateUser = (data) => axios.post(`${USER_AUTH_BASE_URL}/users/create`, data);
export const VerifyEmail = (data) => axios.post(`${USER_AUTH_BASE_URL}/users/verifyEmail`, data);
export const Login = (data) => axios.post(`${USER_AUTH_BASE_URL}/login`, data);
export const ForgotPassword = (data) => axios.post(`${USER_AUTH_BASE_URL}/forgot-password`, data);
export const ConfirmPasswordReset = (data) => axios.post(`${USER_AUTH_BASE_URL}/confirm-password-reset`, data);
export const verifyToken = (data) => axios.post(`${USER_AUTH_BASE_URL}/verifyToken`, data);
export const StoreUserResponse = (data) => axios.post(`${USER_AUTH_BASE_URL}/storeUserResponse`, data);
export const QuestionAnswerValidation = (data) => axios.post(`${USER_AUTH_BASE_URL}/questionAnswerValidation`, data);
export const GetQuestionAnswer = (data) => axios.post(`${USER_AUTH_BASE_URL}/getQuestionAnswer`, data);