// game session to track score and validate player inputs
export interface ISession {
  id: string;
  word: string;
  hasEnded: boolean;
  score: number;
  created_at: Date;
  updated_at: Date;
}
