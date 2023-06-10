import React, { Fragment } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import VerifyQuestionAnswersPage from "./pages/QuestionAndAnswers/VerifyQuestionAnswersPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPasswordPage from "./pages/Forgotpassword/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Forgotpassword/ResetPasswordPage";
import SignUpPage from "./pages/Signup/SignUpPage";

const App = () => {
  return (
    <Fragment>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="verifyQuestionAnswers"
          element={<VerifyQuestionAnswersPage />}
        />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="/signuppage" element={<SignUpPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
