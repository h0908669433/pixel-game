import type { Question, Answer, GameResult } from '../types';

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_APP_SCRIPT_URL;

export const fetchQuestions = async (count: number): Promise<Question[]> => {
  if (!SCRIPT_URL) throw new Error("Missing SCRIPT_URL configuration");
  
  const url = new URL(SCRIPT_URL);
  url.searchParams.append('action', 'getQuestions');
  url.searchParams.append('count', count.toString());

  try {
    const response = await fetch(url.toString(), {
      redirect: 'follow',
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch questions');
    }
    const result = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to fetch questions');
    return result.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const submitAnswers = async (id: string, answers: Answer[], passThreshold: number): Promise<GameResult> => {
  if (!SCRIPT_URL) throw new Error("Missing SCRIPT_URL configuration");
  
  const url = new URL(SCRIPT_URL);
  url.searchParams.append('action', 'submitScore');
  url.searchParams.append('id', id);
  url.searchParams.append('answers', JSON.stringify(answers));
  url.searchParams.append('passThreshold', passThreshold.toString());

  try {
    const response = await fetch(url.toString(), {
      redirect: 'follow',
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      }
    });
    
    if (!response.ok) {
        throw new Error('Failed to submit score');
    }
    const result = await response.json();
    if (!result.success) throw new Error(result.error || 'Failed to submit score');
    return result.data;
  } catch (error) {
    console.error('Error submitting answers:', error);
    throw error;
  }
};
