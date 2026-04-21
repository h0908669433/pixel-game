import React, { useState } from 'react';
import { useGameStore } from '../store';

export const StartScreen: React.FC = () => {
  const [inputId, setInputId] = useState('');
  const setPlayerId = useGameStore((state) => state.setPlayerId);
  const setScreen = useGameStore((state) => state.setScreen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputId.trim()) {
      setPlayerId(inputId.trim());
      setScreen('loading');
    }
  };

  return (
    <div className="nes-container is-dark with-title" style={{ width: '100%', textAlign: 'center' }}>
      <p className="title">Pixel Quiz Arcade</p>
      <div style={{ marginBottom: '2rem' }}>
        <i className="nes-icon is-large star"></i>
        <i className="nes-icon is-large star"></i>
        <i className="nes-icon is-large star"></i>
      </div>
      <p style={{ marginBottom: '2rem', lineHeight: '1.5' }}>Welcome to the Ultimate<br/>Pixel Art Quiz Challenge!</p>
      
      <form onSubmit={handleSubmit}>
        <div className="nes-field is-inline" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
          <label htmlFor="player_id" style={{ color: '#fff' }}>ID:</label>
          <input 
            type="text" 
            id="player_id" 
            className="nes-input is-dark" 
            placeholder="Enter your ID"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            style={{ maxWidth: '200px' }}
            required
            autoFocus
          />
        </div>
        <button type="submit" className="nes-btn is-primary">INSERT COIN (START)</button>
      </form>
    </div>
  );
};
