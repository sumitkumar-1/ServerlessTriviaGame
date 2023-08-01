import React, { useState } from "react";
import "./ProfileBar.css";
import MetricChart from "../Chart/MetricChart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteIcon from "@mui/icons-material/Delete";

const ProfileBar = (props) => {
  const [isNotificationOpen, setIsNotitifcationOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const EditProfile = async (e) => {
    navigate("/editProfile");
  };

  const Logout = async () => {
    const logout = await auth.logout();
    if (logout) {
      navigate("/login");
    }
  };

  const handleNotification = () => {
    if (isNotificationOpen) {
      setIsNotitifcationOpen(false);
    } else {
      setIsNotitifcationOpen(true);
    }
    console.log("Notification Button Clicked");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-xs-12 col-md-12 col-lg-6">
          <div className="profileBarContainer">
            <div className="row">
              <div className="profiledetails">
                <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                  <div className="profileimagecontainer">
                    <img
                      className="profileimage"
                      alt="profileimage"
                      src={
                        props.userData.picture !== ""
                          ? props.userData.picture
                          : require("../../assets/profile.png")
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                  <div className="profileDescription">
                    <div className="nameContainer">
                      <h6>
                        {props?.userData?.family_name +
                          " " +
                          props?.userData?.given_name}
                      </h6>
                      <div
                        className="notification"
                        onClick={handleNotification}
                      >
                        <div
                          onClick={handleNotification}
                          style={{ cursor: "pointer" }}
                        >
                          <Badge color="secondary" badgeContent={1}>
                            <NotificationsIcon fontSize="large" />
                          </Badge>
                        </div>
                        {isNotificationOpen ? (
                          <div className="notificationContent">
                            <p>
                              Welcome to the Trivia Game. Let's get you on
                              Board.
                            </p>
                            <hr />
                            <div className="deleteNotificationContainer">
                              <DeleteIcon />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <p>{props.userData.email}</p>
                    <p className="mobile">{props.userData.phone_number}</p>
                    <div className="profileButtons">
                      <button className="btn btn-primary" onClick={EditProfile}>
                        Edit Profile
                      </button>
                      <button className="btn btn-primary" onClick={Logout}>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-xs-12 col-md-12 col-lg-6">
          {props.gameData.win !== 0 || props.gameData.loss !== 0 ? (
            <MetricChart win={props.gameData.win} loss={props.gameData.loss} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
