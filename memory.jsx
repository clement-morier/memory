import React, { useState, useEffect } from 'react';
import './App.css';

// Sous-composant Title
const Title = () => {
  return <h1>Memory Game</h1>;
};

// Sous-composant Button
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

// Sous-composant Card
const Card = ({ value, onClick, flipped, solved }) => {
  return (
    <div
      className={`card ${flipped || solved ? 'flipped' : ''}`}
      onClick={onClick}
    >
      {(flipped || solved) && <span>{value}</span>}
    </div>
  );
};

const cardsData = [
  { id: 1, value: 'A' },
  { id: 2, value: 'B' },
  { id: 3, value: 'C' },
  { id: 4, value: 'D' },
  { id: 5, value: 'E' },
  { id: 6, value: 'F' },
  { id: 7, value: 'G' },
  { id: 8, value: 'H' },
];

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);

  useEffect(() => {
    const shuffledCards = shuffle(cardsData.concat(cardsData));
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      checkForMatch();
    }
  }, [flipped]);

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (index) => {
    if (flipped.length === 0 || flipped.length === 1) {
      if (!flipped.includes(index)) {
        setFlipped([...flipped, index]);
      }
    }
  };

  const checkForMatch = () => {
    const [firstCard, secondCard] = flipped;
    if (cards[firstCard].value === cards[secondCard].value) {
      setSolved([...solved, firstCard, secondCard]);
      setFlipped([]);
    } else {
      setTimeout(() => {
        setFlipped([]);
      }, 1000);
    }
  };

  const isGameComplete = () => {
    return solved.length === cards.length;
  };

  const restartGame = () => {
    const shuffledCards = shuffle(cardsData.concat(cardsData));
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
  };

  return (
    <div className="App">
      <Title />
      <div className="card-container">
        {cards.map((card, index) => (
          <Card
            key={index}
            value={card.value}
            flipped={flipped.includes(index)}
            solved={solved.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      {isGameComplete() && <p>Congratulations! You've won!</p>}
      <Button onClick={restartGame} text="Restart Game" />
    </div>
  );
}

export default App;