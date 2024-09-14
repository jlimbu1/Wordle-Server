import { Injectable } from '@nestjs/common';
import { ISession } from 'src/utils/interface';
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
    // return null if the given word is not valid
    if (word && !this.isValidWord(word)) return null;

    // set word to user given word or a random word
    const index = word
      ? words.indexOf(word)
      : Math.floor(Math.random() * words.length);

    const newSession: ISession = {
      id: uuidv4(),
      word: words[index],
      hasEnded: false,
      score: 0,
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
    const length = word.split('').length;
    if (length !== WORD_LENGTH) return false;

    // TODO: other validation for word

    return true;
  }
}
