// game session to track score and validate player inputs
export interface ISession {
  id: string;
  word: string;
  hasEnded: boolean;
  score: number;
  guesses: number;
  created_at: Date;
  updated_at: Date;
  // TODO: store guesses
}

// scoring conditions
export enum Condition {
  HIT = 'HIT',
  PRESENT = 'PRESENT',
  MISS = 'MISS',
}
