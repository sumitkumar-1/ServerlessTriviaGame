import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Table, Modal, Tabs, Tab } from "react-bootstrap";
import { Bar, Line, Pie } from "react-chartjs-2";
import teamManagementService from '../../services/team.management.service';

const TeamDashboardPage = () => {
  
  const [teamName, setTeamName] = useState("Awesome Team");
  
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "Member" },
  ]);

  const [teamStatistics, setTeamStatistics] = useState({
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    pointsEarned: 0,
  });

  const gameHistory = [
    {
      id: 1,
      date: "2023-06-01",
      opponent: "Team A",
      result: "Win",
      points: 100,
    },
    {
      id: 2,
      date: "2023-06-05",
      opponent: "Team B",
      result: "Loss",
      points: 80,
    },
    {
      id: 3,
      date: "2023-06-08",
      opponent: "Team C",
      result: "Win",
      points: 120,
    }
  ];

  useEffect(() => {
    fetchTeamStatistics()
      .then((statistics) => setTeamStatistics(statistics))
      .catch((error) =>
        console.error("Error fetching team statistics:", error)
      );
  }, []);

  const fetchTeamStatistics = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          gamesPlayed: 20,
          wins: 15,
          losses: 5,
          pointsEarned: 500,
        });
      }, 1000);
    });
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const barChartData = {
    labels: ["Games Played", "Wins", "Losses", "Points Earned"],
    datasets: [
      {
        label: "Team Statistics",
        data: [
          teamStatistics.gamesPlayed,
          teamStatistics.wins,
          teamStatistics.losses,
          teamStatistics.pointsEarned,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 205, 86, 0.5)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ["Game 1", "Game 2", "Game 3", "Game 4", "Game 5"],
    datasets: [
      {
        label: "Points Earned",
        data: [100, 150, 120, 200, 180],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Wins", "Losses"],
    datasets: [
      {
        data: [teamStatistics.wins, teamStatistics.losses],
        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const [invitedMembers, setInvitedMembers] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInviteMember = () => {
    if (inviteEmail) {
      const newInvitation = {
        id: Date.now(),
        email: inviteEmail,
        status: "Pending",
      };

      setInvitedMembers([...invitedMembers, newInvitation]);
      setInviteEmail("");
      setShowInviteModal(false);
    }
  };

  const handleAcceptInvitation = (invitationId) => {
    const updatedInvitations = invitedMembers.map((invitation) => {
      if (invitation.id === invitationId) {
        return { ...invitation, status: "Accepted" };
      }
      return invitation;
    });

    setInvitedMembers(updatedInvitations);
  };

  const handleRejectInvitation = (invitationId) => {
    const updatedInvitations = invitedMembers.filter(
      (invitation) => invitation.id !== invitationId
    );
    setInvitedMembers(updatedInvitations);
  };

  const handleRemoveMember = (memberId) => {
    const updatedMembers = teamMembers.filter(
      (member) => member.id !== memberId
    );
    setTeamMembers(updatedMembers);
  };

  const handlePromoteToAdmin = (memberId) => {
    const updatedMembers = teamMembers.map((member) => {
      if (member.id === memberId) {
        return { ...member, role: "Admin" };
      }
      return member;
    });

    setTeamMembers(updatedMembers);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h2>Team Dashboard</h2>
          <h4>Team: {teamName}</h4>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Tabs defaultActiveKey="stats" id="team-tabs">
            <Tab eventKey="stats" title="Team Statistics">
              <Row className="mt-5">
                <Col>
                  <h4>Win-Loss Ratio</h4>
                  <div style={{ height: "300px", width: "100%" }}>
                    <Pie data={pieChartData} options={chartOptions} />
                  </div>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col>
                  <h4>Team Statistics</h4>
                  <div style={{ height: "300px", width: "100%" }}>
                    <Bar data={barChartData} options={chartOptions} />
                  </div>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col>
                  <h4>Points Earned Over Time</h4>
                  <div style={{ height: "300px", width: "100%" }}>
                    <Line data={lineChartData} options={chartOptions} />
                  </div>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="members" title="Manage Members">
              <Row className="mt-3">
                <Col xs={12} md={6}>
                  <Button variant="primary" onClick={() => setShowInviteModal(true)}>
                    Invite Member
                  </Button>
                  <Modal show={showInviteModal} onHide={() => setShowInviteModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Invite Team Member</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
                      </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowInviteModal(false)} >Cancel</Button>
                      <Button variant="primary" onClick={handleInviteMember}>
                        Send Invitation
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col>
                  <h4>Invited Members</h4>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invitedMembers.map((invitation) => (
                        <tr key={invitation.id}>
                          <td>{invitation.email}</td>
                          <td>{invitation.status}</td>
                          <td>
                            {invitation.status === "Pending" && (
                              <>
                                <Button variant="success" onClick={() => handleAcceptInvitation(invitation.id)}>
                                  Accept
                                </Button>{" "}
                                <Button variant="danger" onClick={() => handleRejectInvitation(invitation.id)}>
                                  Reject
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col>
                  <h4>Team Members</h4>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers.map((member) => (
                        <tr key={member.id}>
                          <td>{member.name}</td>
                          <td>{member.role}</td>
                          <td>
                            {member.role !== "Admin" && (
                              <Button variant="danger" onClick={() => handleRemoveMember(member.id)}>
                                Remove
                              </Button>
                            )}
                            {member.role === "Member" && (
                              <Button variant="info" onClick={() => handlePromoteToAdmin(member.id)} >
                                Promote to Admin
                              </Button>
                            )}
                            {member.role === "Member" && (
                              <Button variant="info" onClick={() => handlePromoteToAdmin(member.id)} >
                                Leave Team
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="gameHistory" title="Game Play History">
              <Row className="mt-5">
                <Col>
                  <h4>Game Play History</h4>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Opponent</th>
                        <th>Result</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gameHistory.map((game) => (
                        <tr key={game.id}>
                          <td>{game.id}</td>
                          <td>{game.date}</td>
                          <td>{game.opponent}</td>
                          <td>{game.result}</td>
                          <td>{game.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default TeamDashboardPage;
