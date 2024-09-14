import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { GameService } from './Game.service';
import { ISession } from 'src/utils/interface';

// TODO: handle permissions (either admin or Game owner only)
@Controller('Games')
export class GameController {
  constructor(private readonly GameService: GameService) {}

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
  createGame(@Body() word: string) {
    return this.GameService.createSession(word);
  }
}
