import React from 'react';
import { useGameStore } from '../store';

export const ResultScreen: React.FC = () => {
  const result = useGameStore((state) => state.result);
  const resetGame = useGameStore((state) => state.resetGame);

  if (!result) return null;

  return (
    <div className="nes-container is-dark with-title" style={{ width: '100%', textAlign: 'center' }}>
      <p className="title">GAME OVER</p>
      
      <div style={{ margin: '2rem 0' }}>
        {result.isPassed ? (
          <div>
            <i className="nes-icon trophy is-large"></i>
            <h2 style={{ color: '#92cc41', marginTop: '1rem' }}>STAGE CLEAR!</h2>
            <p>You defeated the bosses!</p>
          </div>
        ) : (
          <div>
            <i className="nes-icon is-large is-half star"></i>
            <h2 style={{ color: '#e76e55', marginTop: '1rem' }}>YOU DIED</h2>
            <p>Better luck next time...</p>
          </div>
        )}
      </div>

      <div className="nes-container is-rounded is-dark" style={{ marginBottom: '2rem', backgroundColor: '#000' }}>
        <p>SCORE</p>
        <p style={{ fontSize: '1.5rem' }}>{result.score} / {result.totalQuestions}</p>
      </div>

      <button className="nes-btn is-warning" onClick={resetGame}>PLAY AGAIN</button>
    </div>
  );
};
