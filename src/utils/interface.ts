// game session to track score and validate player inputs
export interface ISession {
  id: string;
  word: string;
  status: status;
  score: number;
  maxGuesses: number;
  created_at: Date;
  updated_at: Date;
  guesses: Condition[][];
}

export enum status {
  PENDING = 'PENDING',
  WIN = 'WIN',
  LOSE = 'LOSE',
}

// scoring conditions
export enum Condition {
  HIT = 'HIT',
  PRESENT = 'PRESENT',
  MISS = 'MISS',
}
