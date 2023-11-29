import React, { useState } from 'react';

interface Coordinate {
  x: number;
  y: number;
}

const SnakeGame: React.FC = () => {
  const initialSnake: Coordinate[] = [{ x: 10, y: 10 }];

  const [snake, setSnake] = useState<Coordinate[]>(initialSnake);
  const [currentDirection, setCurrentDirection] = useState<string | null>(null);

  const updateSnake = (direction: string): void => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const lastPart = newSnake[newSnake.length - 1];
      let newPart: Coordinate;

      if (direction === 'right') {
        newPart = { x: lastPart.x + 1, y: lastPart.y };
      } else if (direction === 'up') {
        newPart = { x: lastPart.x, y: lastPart.y - 1 };
      } else if (direction === 'down') {
        newPart = { x: lastPart.x, y: lastPart.y + 1 };
      } else if (direction === 'left') {
        newPart = { x: lastPart.x - 1, y: lastPart.y };
      } else {
        newPart = lastPart;
      }

      newSnake.push(newPart);
      return newSnake;
    });

    setCurrentDirection(direction);
  };

  const handleDirectionClick = (direction: string) => {
    updateSnake(direction);
  };

  return (
    <div className="snake-game">
      <div className="game-board">
        {snake.map((part, index) => (
          <div
            key={index}
            className={`snake-part ${index === snake.length - 1 ? 'head' : 'body'}`}
            style={{
              top: `${part.y * 20}px`,
              left: `${part.x * 20}px`,
              backgroundColor: index === snake.length - 1 ? 'black' : 'skyblue',
            }}
          />
        ))}
      </div>
      <div className="controls">
        <button onClick={() => handleDirectionClick('right')} style={{ display: currentDirection === 'left' ? 'none' : 'block' }}>Right</button>
        <button onClick={() => handleDirectionClick('up')} style={{ display: currentDirection === 'down' ? 'none' : 'block' }}>Up</button>
        <button onClick={() => handleDirectionClick('down')} style={{ display: currentDirection === 'up' ? 'none' : 'block' }}>Down</button>
        <button onClick={() => handleDirectionClick('left')} style={{ display: currentDirection === 'right' ? 'none' : 'block' }}>Left</button>
      </div>
    </div>
  );
};

export default SnakeGame;
