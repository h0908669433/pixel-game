import React from 'react';
import { useGameStore } from './store';
import { StartScreen } from './components/StartScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import './index.css';

const App: React.FC = () => {
  const screen = useGameStore((state) => state.screen);
  const error = useGameStore((state) => state.error);
  const setError = useGameStore((state) => state.setError);

  const renderScreen = () => {
    switch (screen) {
      case 'start':
        return <StartScreen />;
      case 'loading':
        return <LoadingScreen />;
      case 'quiz':
        return <QuizScreen />;
      case 'result':
        return <ResultScreen />;
      default:
        return <StartScreen />;
    }
  };

  return (
    <div className="game-container">
      {error && (
        <div 
          className="nes-container is-rounded is-dark" 
          style={{ 
            position: 'absolute', top: 10, left: 10, right: 10, zIndex: 1000, 
            borderColor: '#e76e55', backgroundColor: '#000'
          }}
        >
          <p style={{ color: '#e76e55', marginBottom: '1rem' }}>ERROR: {error}</p>
          <button className="nes-btn" onClick={() => setError(null)}>DISMISS</button>
        </div>
      )}
      {renderScreen()}
    </div>
  );
}

export default App;
