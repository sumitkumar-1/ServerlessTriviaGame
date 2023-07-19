import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Dropdown, Table } from "react-bootstrap";
import leaderBoardService from "../../services/leaderboard.service";

const LeaderboardPage = () => {
  const [leaderboardType, setLeaderboardType] = useState("individual");
  const [timeInterval, setTimeInterval] = useState("all-time");
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, [leaderboardType, timeInterval]);

  const fetchLeaderboard = () => {
    // TODO?
    leaderBoardService.getGlobalLeaderboard()
      .then((response) => {
        setLeaderboardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard:", error);
      });
  };

  const handleLeaderboardTypeChange = (type) => {
    setLeaderboardType(type);
  };

  const handleTimeIntervalChange = (interval) => {
    setTimeInterval(interval);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Leaderboard</h1>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="secondary">
              {leaderboardType === "individual" ? "Individual" : "Team"} Leaderboard
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleLeaderboardTypeChange("individual")}>
                Individual
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleLeaderboardTypeChange("team")}>
                Team
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="secondary">
              {timeInterval === "all-time" ? "All Time" : timeInterval.charAt(0).toUpperCase() + timeInterval.slice(1)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleTimeIntervalChange("daily")}>
                Daily
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleTimeIntervalChange("weekly")}>
                Weekly
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleTimeIntervalChange("monthly")}>
                Monthly
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleTimeIntervalChange("all-time")}>
                All Time
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h3>{leaderboardType === "individual" ? "Individual" : "Team"} Leaderboard</h3>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <tr key={entry.id}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default LeaderboardPage;
