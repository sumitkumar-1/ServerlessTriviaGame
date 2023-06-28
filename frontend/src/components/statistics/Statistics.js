import React from "react";
import "./Statistics.css";

const Statistics = (props) => {

  return (
    <div className="container">
      <div className="row">
        <div className="sectionTitle">
          <h1>Game Statistics</h1>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
          <div className="statisticCard">
            <div className="iconContainer">
              <img
                className="icon"
                src={require("../../assets/trophy.png")}
                alt="trophy icon"
              />
            </div>
            <div className="details">
              <p>Total Wins</p>
              <h1>{props.gameData.win}</h1>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
          <div className="statisticCard">
            <div className="iconContainer">
              <img
                className="icon"
                src={require("../../assets/lose.png")}
                alt="trophy icon"
              />
            </div>
            <div className="details">
              <p>Total Loss</p>
              <h1>{props.gameData.loss}</h1>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
          <div className="statisticCard">
            <div className="iconContainer">
              <img
                className="icon"
                src={require("../../assets/joystick.png")}
                alt="trophy icon"
              />
            </div>
            <div className="details">
              <p>Games Played</p>
              <h1>{props.gameData.totalGamePlayed}</h1>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
          <div className="statisticCard">
            <div className="iconContainer">
              <img
                className="icon"
                src={require("../../assets/medal.png")}
                alt="trophy icon"
              />
            </div>
            <div className="details">
              <p>Points Earned</p>
              <h1>{props.gameData.totalPoints}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
