import React, { useEffect } from 'react';

const GameListener = ({ onMessage, onError, onClose }) => {
  useEffect(() => {
    const eventSource = new EventSource('https://ys6m7oxeaa.execute-api.us-east-1.amazonaws.com/dev/api/sse');

    eventSource.onmessage = (event) => {
      const gameData = JSON.parse(event.data);
      onMessage(gameData);
    };

    eventSource.onerror = (error) => {
      onError(error);
    };

    eventSource.onclose = () => {
      onClose();
    };

    return () => {
      eventSource.close();
    };
  }, [onMessage, onError, onClose]);

  return null;
};

export default GameListener;
