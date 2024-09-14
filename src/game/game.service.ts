import { Injectable } from '@nestjs/common';
import { ISession } from 'src/utils/interface';
import { sessions, words } from 'test/data';
import { v4 as uuidv4 } from 'uuid';

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
      created_at: new Date(),
      updated_at: new Date(),
    };

    sessions.push(newSession);

    return newSession.id;
  }

  removeSession(id: string) {
    // TODO: find by id and remove
  }
}
