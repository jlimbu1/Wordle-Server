import { Injectable } from '@nestjs/common';
import { Condition, ISession } from 'src/utils/interface';
import { sessions, words } from 'test/data';
import { v4 as uuidv4 } from 'uuid';

// word length for validation
const WORD_LENGTH = 5;

@Injectable()
export class GameService {
  getAllWords() {
    return words;
  }

  getAllSessions() {
    return sessions;
  }

  createSession(word: string = '') {
    // set word to user given word or a random word
    const index = word
      ? words.indexOf(word)
      : Math.floor(Math.random() * words.length);

    const newSession: ISession = {
      id: uuidv4(),
      word: words[index],
      hasEnded: false,
      score: 0,
      guesses: 0,
      created_at: new Date(),
      updated_at: new Date(),
    };

    sessions.push(newSession);

    return newSession.id;
  }

  removeSession(id: string) {
    // TODO: find by id and remove
  }

  isValidWord(word: string) {
    // validate the word length
    const length = word?.split('')?.length;
    if (length !== WORD_LENGTH) return false;

    // TODO: other validation for word

    return true;
  }

  checkGuess(id: string, guess: string) {
    if (!id || !guess) return null;

    const session = sessions.find((x) => x.id === id);
    const word = session.word;
    const result = [];
    const usedIndices = new Set();

    // Check for hits first
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === word[i]) {
        result.push(Condition.HIT);
        usedIndices.add(i);
      }
    }

    // Check for present
    for (let i = 0; i < guess.length; i++) {
      if (!usedIndices.has(i)) {
        if (word.includes(guess[i])) {
          result.push(Condition.PRESENT);
        } else {
          result.push(Condition.MISS);
        }
      }
    }

    ++session.guesses;

    return result;
  }
}
