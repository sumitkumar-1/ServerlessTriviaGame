import React from "react";
import "./ProfileBar.css";
import MetricChart from "../Chart/MetricChart";
import { useNavigate } from "react-router-dom";

const ProfileBar = (props) => {
  const navigate = useNavigate();
  const EditProfile = async (e) => {
    navigate("/editProfile");
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
                      src={props.userData.picture !== "" ?  props.userData.picture : require("../../assets/profile.png")}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                  <div className="profileDescription">
                    <h6>
                      {props.userData.family_name +
                        " " +
                        props.userData.given_name}
                    </h6>
                    <p>{props.userData.email}</p>
                    <p className="mobile">{props.userData.phone_number}</p>
                    <button className="btn btn-primary" onClick={EditProfile}>
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-xs-12 col-md-12 col-lg-6">
          <MetricChart />
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
