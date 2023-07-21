import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import questionCategories from "./questionCategories"
import QuestionForm from "./Question/QuestionForm";

const Forms = () => {
  const [gameData, setGameData] = useState({
    category: "",
    difficulty: "",
    questions: "",
    timeLimit: "",
    name: "",
    participants: "",
    status: "",
  });

  const [questionData, setQuestionData] = useState({
    category: "",
    difficulty: "",
    question: "",
    options: "",
    correctAnswerId: "",
  });

  const handleGameChange = (e) => {
    setGameData({ ...gameData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const submitGameData = (e) => {
    e.preventDefault();
    console.log(gameData);
    // API call to create a game with the gameData object
  };

  const submitQuestionData = (e) => {
    e.preventDefault();
    console.log(questionData);
    // API call to create a question with the questionData object
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Create Game</h2>
          <Form onSubmit={submitGameData}>
            <Form.Group controlId="gameCategory">
              <Form.Label>Category</Form.Label>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={questionCategories}
                onChange={handleGameChange}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select" />}
              />
            </Form.Group>

            <Form.Group controlId="gameDifficulty">
              <Form.Label>Difficulty</Form.Label>
              <Form.Select
                name="difficulty"
                onChange={handleGameChange}
                required
              >
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="gameQuestions">
              <Form.Label>Questions</Form.Label>
              <Form.Control
                name="questions"
                type="number"
                placeholder="Number of questions"
                min="1"
                onChange={handleGameChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="gameTimeLimit">
              <Form.Label>Time Limit (seconds)</Form.Label>
              <Form.Control
                name="timeLimit"
                type="number"
                placeholder="Time limit per question"
                min="1"
                onChange={handleGameChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="gameName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter game name"
                onChange={handleGameChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="gameParticipants">
              <Form.Label>Participants</Form.Label>
              <Form.Control
                name="participants"
                type="number"
                placeholder="Number of participants"
                min="1"
                onChange={handleGameChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="gameStatus">
              <Form.Check
                name="status"
                type="checkbox"
                label="Game Active"
                onChange={() =>
                  setGameData({ ...gameData, status: !gameData.status })
                }
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Create Game
            </Button>
          </Form>
        </Col>
        <QuestionForm />
      </Row>
    </Container>
  );
};

export default Forms;