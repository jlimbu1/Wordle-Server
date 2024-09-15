import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { GameService } from './Game.service';
import { Condition, ISession, status } from 'src/utils/interface';

// TODO: handle permissions (either admin or Game owner only)
@Controller('Games')
export class GameController {
  constructor(private readonly GameService: GameService) {}

  // not used anymore since word list are stored on client side
  // endpoint: {base_url}/Games/words
  // returns all words
  @Get('/words')
  getAllWords(): string[] {
    return this.GameService.getAllWords();
  }

  // endpoint: {base_url}/Games/sessions
  // returns all sessions
  @Get('/sessions')
  getAllSessions(): ISession[] {
    return this.GameService.getAllSessions();
  }

  // endpoint: {base_url}/Games/sessions/:id
  // returns a session given id
  @Get('/sessions/:id')
  getSession(@Param('id') id: string): ISession[] {
    return this.GameService.getAllSessions();
  }

  // POST endpoint: {base_url}/Games/sessions
  // returns newly created session id
  @Post('/sessions')
  createGame(
    @Body() payload: { wordList: string[]; word: string; maxGuesses: number },
  ) {
    const { wordList, word, maxGuesses } = payload;
    return this.GameService.createSession(wordList, maxGuesses, word);
  }

  // endpoint: {base_url}/Games/check/:id/:guess
  // returns a session given id
  @Get('/check/:id/:guess')
  checkGuess(
    @Param('id') id: string,
    @Param('guess') guess: string,
  ): { result: Condition[]; status: status; score: number; answer?: string } {
    return this.GameService.checkGuess(id, guess);
  }
}
