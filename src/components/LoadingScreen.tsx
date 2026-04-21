import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store';
import { fetchQuestions } from '../services/api';

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading resources...');
  
  const setQuestions = useGameStore((state) => state.setQuestions);
  const setScreen = useGameStore((state) => state.setScreen);
  const setError = useGameStore((state) => state.setError);
  
  const QUESTION_COUNT = parseInt(import.meta.env.VITE_QUESTION_COUNT || '5');

  useEffect(() => {
    let isMounted = true;

    const initializeGame = async () => {
      try {
        // 1. Fetch questions from GAS
        setLoadingText('Fetching questions...');
        const fetchedQuestions = await fetchQuestions(QUESTION_COUNT);
        if (!isMounted) return;
        
        setProgress(30);

        // 2. Preload 100 Boss Images as requested
        setLoadingText('Preloading boss sprites...');
        const imageUrls: string[] = [];
        for (let i = 1; i <= 100; i++) {
          imageUrls.push(`https://api.dicebear.com/8.x/pixel-art/svg?seed=boss${i}`);
        }

        let loadedImages = 0;
        await Promise.all(
          imageUrls.map(
            (url) =>
              new Promise<void>((resolve) => {
                const img = new Image();
                img.src = url;
                img.onload = () => {
                  loadedImages++;
                  if (isMounted) {
                    setProgress(30 + Math.floor((loadedImages / 100) * 70));
                  }
                  resolve();
                };
                img.onerror = () => {
                  // even if it fails, resolve to not block the game
                  resolve(); 
                };
              })
          )
        );

        if (!isMounted) return;
        
        setLoadingText('READY!');
        setQuestions(fetchedQuestions);
        
        // slight delay to show 100%
        setTimeout(() => {
          if (isMounted) setScreen('quiz');
        }, 500);

      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Failed to initialize game');
          setScreen('start'); // go back or show error
        }
      }
    };

    initializeGame();

    return () => {
      isMounted = false;
    };
  }, [setQuestions, setScreen, setError, QUESTION_COUNT]);

  return (
    <div className="nes-container is-dark" style={{ width: '100%', textAlign: 'center' }}>
      <p>{loadingText}</p>
      <progress className="nes-progress is-pattern" value={progress} max="100" style={{ width: '100%' }}></progress>
    </div>
  );
};
