import { create } from 'zustand';
import { Question, Answer, GameResult } from './types';

interface GameState {
  screen: 'start' | 'loading' | 'quiz' | 'result';
  playerId: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  result: GameResult | null;
  error: string | null;

  setScreen: (screen: 'start' | 'loading' | 'quiz' | 'result') => void;
  setPlayerId: (id: string) => void;
  setQuestions: (questions: Question[]) => void;
  answerQuestion: (answer: string) => void;
  setResult: (result: GameResult) => void;
  setError: (error: string | null) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  screen: 'start',
  playerId: '',
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  result: null,
  error: null,

  setScreen: (screen) => set({ screen }),
  setPlayerId: (id) => set({ playerId: id }),
  setQuestions: (questions) => set({ questions }),
  answerQuestion: (answer) => {
    const { questions, currentQuestionIndex, answers } = get();
    const currentQ = questions[currentQuestionIndex];
    
    set({
      answers: [...answers, { id: currentQ.id, answer }],
      currentQuestionIndex: currentQuestionIndex + 1,
    });
  },
  setResult: (result) => set({ result }),
  setError: (error) => set({ error }),
  resetGame: () => set({
    screen: 'start',
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    result: null,
    error: null
  })
}));
