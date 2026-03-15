import { customAlphabet } from 'nanoid';
import { WadCommandLogMessageLevel } from './log-message-levels';

const WAD_LOG_ID_ALPHABET = 'abcd1234';
const WAD_LOG_ID_ALPHABET_SIZE = 4;
const WAD_LOG_ID_GENERATOR = customAlphabet(WAD_LOG_ID_ALPHABET, WAD_LOG_ID_ALPHABET_SIZE);

export class WadCommandLogMessage {
  id = [Date.now(), WAD_LOG_ID_GENERATOR()].join('-');
  message!: string;
  level!: WadCommandLogMessageLevel;

  constructor(message: string, level: WadCommandLogMessageLevel = WadCommandLogMessageLevel.DEBUG) {
    this.message = message;
    this.level = level;
  }
}
