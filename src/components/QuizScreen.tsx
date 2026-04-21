import React, { useState } from 'react';
import { useGameStore } from '../store';
import { BossImage } from './BossImage';
import { submitAnswers } from '../services/api';

export const QuizScreen: React.FC = () => {
  const { 
    questions, 
    currentQuestionIndex, 
    answerQuestion, 
    answers, 
    playerId,
    setResult,
    setScreen,
    setError
  } = useGameStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentQ = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const PASS_THRESHOLD = parseInt(import.meta.env.VITE_PASS_THRESHOLD || '3');

  const handleOptionClick = async (optionKey: string) => {
    if (isSubmitting) return;

    if (isLastQuestion) {
      setIsSubmitting(true);
      // Construct final answers array including this last answer
      const finalAnswers = [...answers, { id: currentQ.id, answer: optionKey }];
      
      try {
        const result = await submitAnswers(playerId, finalAnswers, PASS_THRESHOLD);
        setResult(result);
        answerQuestion(optionKey); // update store state
        setScreen('result');
      } catch (err: any) {
        setError(err.message || 'Failed to submit score');
        setIsSubmitting(false);
      }
    } else {
      answerQuestion(optionKey);
    }
  };

  if (!currentQ) return null;

  // Use question index to pick a unique boss seed (1-100)
  // Ensure we cycle through 1-100 if there are many questions, though it's likely just 5-10
  const bossSeed = `boss${(currentQuestionIndex % 100) + 1}`;

  return (
    <div className="nes-container is-dark with-title" style={{ width: '100%', position: 'relative' }}>
      <p className="title">STAGE {currentQuestionIndex + 1} / {questions.length}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <BossImage seed={bossSeed} size={120} />
        
        <div className="nes-balloon from-bottom is-dark" style={{ marginTop: '1rem', marginBottom: '2rem', width: '100%' }}>
          <p>{currentQ.question}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          {(Object.entries(currentQ.options) as [string, string][]).map(([key, text]) => (
            <button 
              key={key} 
              className={`nes-btn ${isSubmitting ? 'is-disabled' : ''}`}
              onClick={() => handleOptionClick(key)}
              disabled={isSubmitting}
              style={{ textAlign: 'left', minHeight: '3.5rem' }}
            >
              <span style={{ color: '#209cee', marginRight: '1rem' }}>{key}.</span> 
              {text}
            </button>
          ))}
        </div>
      </div>
      
      {isSubmitting && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <p>Calculating Score...</p>
        </div>
      )}
    </div>
  );
};
