import { Controller, Get, Param } from '@nestjs/common';
import { WordService } from './word.service';

// TODO: handle permissions (either admin or word owner only)
@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  // endpoint: {base_url}/words
  // returns all words
  @Get()
  getAllWords(): string[] {
    return this.wordService.getAllWords();
  }

  // endpoint: {base_url}/words/:word
  // return checking result
  @Get(':word')
  getRandomWords(@Param('word') word: string) {
    // return this.wordService.checkWord(word);
  }
}
