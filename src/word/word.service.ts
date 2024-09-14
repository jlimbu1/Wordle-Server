import { Injectable } from '@nestjs/common';
import { words } from 'test/data';

@Injectable()
export class WordService {
  getAllWords() {
    return words;
  }
}
