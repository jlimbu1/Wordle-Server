import { Injectable } from '@nestjs/common';
import { Condition, ISession, status } from 'src/utils/interface';
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

  getAllAvailableRooms() {
    return sessions
      .filter((x) => x.isMultiplayer && x.status === status.PENDING)
      .map((x) => x.id);
  }

  createSession(
    wordList: string[],
    isMultiplayer: boolean = false,
    maxGuesses: number = 5,
    word: string = '',
  ) {
    // set word to user given word or a random word from the client side word list
    const index = word
      ? wordList.indexOf(word)
      : Math.floor(Math.random() * wordList.length);

    const newSession: ISession = {
      id: uuidv4(),
      word: wordList[index],
      status: status.PENDING,
      score: 0,
      guesses: [],
      maxGuesses,
      isMultiplayer,
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
    if (session.status !== status.PENDING) return null;

    const word = session.word?.toLowerCase();
    const lowerCaseGuess = guess?.toLowerCase();
    const result = [];

    for (let i = 0; i < guess.length; i++) {
      if (lowerCaseGuess[i] === word[i]) result.push(Condition.HIT);
      else if (word.includes(lowerCaseGuess[i])) result.push(Condition.PRESENT);
      else result.push(Condition.MISS);
    }

    // add result to guesses list and calculate score
    session.guesses.push(result);
    session.score = this.calculateScore(session.guesses);

    // update game session status
    if (session.guesses.length >= session.maxGuesses)
      session.status = status.LOSE;
    if (result.every((item) => item === Condition.HIT))
      session.status = status.WIN;

    return {
      result,
      status: session.status,
      score: session.score,
      guesses: session.guesses.length,
      answer: session.status === status.LOSE && session.word, // only provide the word when player loses
    };
  }

  // get the highest point of each index
  /*eg. if the guesses were
    ["HIT", "MISS", "PRESENT", "MISS", "MISS"],
    ["HIT", "MISS", "PRESENT", "MISS", "MISS"],
    ["HIT", "MISS", "MISS", "HIT", "PRESENT"]

    then the maximum awarded would be 14 (5 + 0 + 2 + 5 + 2) since,
    ["HIT", "MISS", "PRESENT", "HIT", "PRESENT"]
    would result in the maximum scores for each index
  */
  calculateScore(guesses) {
    let totalScore = 0;
    const points = {
      HIT: 5,
      PRESENT: 2,
      MISS: 0,
    };

    for (let i = 0; i < guesses[0].length; i++) {
      let maxScore = 0;
      for (let j = 0; j < guesses.length; j++) {
        let currentScore = points[guesses[j][i]];
        if (currentScore > maxScore) {
          maxScore = currentScore;
        }
      }
      totalScore += maxScore;
    }

    return totalScore;
  }
}
