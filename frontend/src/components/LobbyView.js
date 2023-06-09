import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import './LobbyView.scss';

const LobbyView = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://ys6m7oxeaa.execute-api.us-east-1.amazonaws.com/dev/api/fetch-games', {
        // const response = await axios.get('http://localhost:3000/dev/api/fetch-games/', {
          headers: {
            'Authorization': 'Bearer dummy-token',
          },
        });
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching trivia games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="lobby-view">
      <Container>
        <Row>
          {games.map((game) => (
            <Col key={game.id} sm={12} md={6} lg={4}>
              <Card className="game-card">
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  <Card.Text>Category: {game.category}</Card.Text>
                  {/* Additional game information */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default LobbyView;
