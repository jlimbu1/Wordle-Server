import { Controller, Get, Param } from '@nestjs/common';
import { GameService } from './Game.service';
import { ISession } from 'src/utils/interface';

// TODO: handle permissions (either admin or Game owner only)
@Controller('Games')
export class GameController {
  constructor(private readonly GameService: GameService) {}

  // endpoint: {base_url}/Games/words
  // returns all Games
  @Get('/words')
  getAllWords(): string[] {
    return this.GameService.getAllWords();
  }

  // endpoint: {base_url}/Games/sessions
  // returns all Games
  @Get('/sessions')
  getAllSessions(): ISession[] {
    return this.GameService.getAllSessions();
  }

  // endpoint: {base_url}/Games/create
  // return checking result
  @Get('/create')
  createGame() {
    return this.GameService.createSession();
  }
}
