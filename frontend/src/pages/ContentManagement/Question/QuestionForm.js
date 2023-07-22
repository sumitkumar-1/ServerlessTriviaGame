import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import questionCategories from "../questionCategories";
import axios from "axios";

const QuestionForm = () => {
    const [questionData, setQuestionData] = useState({
        category: "",
        difficulty: "",
        question: "",
        options: "",
        correctAnswerId: "",
    });

    const handleQuestionChange = (e) => {
        setQuestionData({ ...questionData, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        getQuestions();
    }, [])

       async function getQuestions() {
        const response = await axios.get("https://ioznpk5b6f.execute-api.us-east-1.amazonaws.com/dev/questions");
        console.log(response);
    }

    const submitQuestionData = (e) => {
        e.preventDefault();
        console.log(questionData);

    };

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Create Question</h2>
                    <Form onSubmit={submitQuestionData}>
                        <Form.Group controlId="questionCategory">
                            <Form.Label>Category</Form.Label>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={questionCategories()}
                                onChange={handleQuestionChange}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Select" />}
                            />
                        </Form.Group>
                        <Form.Group controlId="questionDifficulty">
                            <Form.Label>Difficulty</Form.Label>
                            <Form.Control
                                as="select"
                                name="difficulty"
                                onChange={handleQuestionChange}
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="questionText">
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="question"
                                onChange={handleQuestionChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="questionOptions">
                            <Form.Label>Options</Form.Label>
                            <Form.Group controlId="options">
                                <Form.Label>Option 1</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="option1"
                                    onChange={handleQuestionChange}
                                />
                                <Form.Label>Option 2</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="option2"
                                    onChange={handleQuestionChange}
                                />
                                <Form.Label>Option 3</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="option3"
                                    onChange={handleQuestionChange}
                                />
                                <Form.Label>Option 4</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="option4"
                                    onChange={handleQuestionChange}
                                />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group controlId="questionCorrectAnswer">
                            <Form.Label>Correct Answer</Form.Label>
                            <Form.Control
                                as="select"
                                name="correctAnswerId"
                                onChange={handleQuestionChange}
                            >
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                                <option value="4">Option 4</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="answerExplanation">
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="explanation"
                                onChange={handleQuestionChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default QuestionForm;