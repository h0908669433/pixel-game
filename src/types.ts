export interface Question {
  id: string | number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

export interface Answer {
  id: string | number;
  answer: string;
}

export interface GameResult {
  score: number;
  isPassed: boolean;
  totalQuestions: number;
}
