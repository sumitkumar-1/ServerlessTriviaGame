import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import './LobbyView.scss';
// import GameListener from './GameListener';

const animatedComponents = makeAnimated();

const LobbyView = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [wsConnection, setWsConnection] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('wss://djwkdpdytb.execute-api.us-east-1.amazonaws.com/dev');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = handleMessage;

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    setWsConnection(ws);

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          'https://ys6m7oxeaa.execute-api.us-east-1.amazonaws.com/dev/api/fetch-games',
          {
            headers: {
              Authorization: 'Bearer dummy-token'
            },
          }
        );
        console.log('Games fetched:', response.data);
        setGames(response.data);
        setFilteredGames(response.data);
      }

      catch (error) {
        console.error('Error fetching trivia games:', error);
      }
    };

    fetchGames();
  }, []);

  const handleFilterChange = (selectedOptions, filter) => {
    let filtered = games;

    if (selectedOptions.some(option => option.value === 'All')) {
      setSelectedCategories(filter === 'category' ? [] : selectedCategories);
      setSelectedDifficulties(filter === 'difficulty' ? [] : selectedDifficulties);
    } else if (filter === 'category') {
      setSelectedCategories(selectedOptions);
      if (selectedOptions.length > 0) {
        filtered = filtered.filter((game) => selectedOptions.some(option => option.value === game.category));
      }
    } else if (filter === 'difficulty') {
      setSelectedDifficulties(selectedOptions);
      if (selectedOptions.length > 0) {
        filtered = filtered.filter((game) => selectedOptions.some(option => option.value === game.difficulty));
      }
    }

    setFilteredGames(filtered);
  };

  const handleMessage = (gameData) => {
    setGames((prevGames) => [...prevGames, gameData]);
  };

  return (
    <div className="lobby-view">
      <h2 className="lobby-heading">Trivia Game Lobby</h2>
      <div className="game-filters">
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <Select
            isMulti
            components={animatedComponents}
            onChange={(selected) => handleFilterChange(selected, 'category')}
            className='basic-multi-select'
            classNamePrefix='select'
            options={[{ value: 'All', label: 'All' }, ...games.map(game => ({ value: game.category, label: game.category }))]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <Select
            isMulti
            components={animatedComponents}
            onChange={(selected) => handleFilterChange(selected, 'difficulty')}
            className='basic-multi-select'
            classNamePrefix='select'
            options={[{ value: 'All', label: 'All' }, ...games.map(game => ({ value: game.difficulty, label: game.difficulty }))]}
          />
        </div>
      </div>
      <Container>
        <Row>
          {filteredGames.map((game) => (
            <Col key={game.id} sm={12} md={6} lg={4}>
              <Card className="game-card">
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  <Card.Text>Category: {game.category}</Card.Text>
                  <Card.Text>Difficulty: {game.difficulty}</Card.Text>
                  <Card.Text>Players: {game.participants ? game.participants.length : '0'}/{game.maxPlayers}</Card.Text>
                  <Card.Text>Host: {game.host || ''}</Card.Text>
                  <Card.Text>Game ID: {game.id || ''}</Card.Text>
                  <Card.Text>Remaining Time: {game.remainingTime || '0'}</Card.Text>
                  <Link to={`/game/${game.gameId}`} className="btn btn-primary">Join Game</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* <GameListener onMessage={handleMessage} onError={handleError} /> */}
    </div>
  );
};

export default LobbyView;