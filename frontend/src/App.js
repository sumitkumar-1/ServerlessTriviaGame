import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import HomePage from "./pages/HomePage";
import VerifyQuestionAnswersPage from "./pages/QuestionAndAnswers/VerifyQuestionAnswersPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPasswordPage from "./pages/Forgotpassword/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Forgotpassword/ResetPasswordPage";
import SignUpPage from "./pages/Signup/SignUpPage";
import LobbyView from "./components/Lobby/LobbyView";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginPage from "./pages/Login/LoginPage";
import EditProfile from "./pages/EditProfile/EditProfile";
import Forms from "./pages/ContentManagement/Forms";
import CreateTeamPage from "./pages/CreateTeam/CreateTeam";
import TeamDashboardPage from "./pages/TeamDashboard/TeamDashboard";
import LeaderboardPage from "./pages/LeaderBoard/LeaderBoard";
import DetailedStatisticsPage from "./pages/DetailedLeaderBoard/DetailedLeaderBoard";

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
        <Route path="/cms" element={<Forms />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/lobby" element={<LobbyView />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/cms" element={<Forms />} />
            <Route path="/createTeam" element={<CreateTeamPage />} />
            <Route path="/teamdashboard/:id" element={<TeamDashboardPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/detailedleaderboard" element={<DetailedStatisticsPage />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
