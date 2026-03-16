import { customAlphabet } from 'nanoid';
import { WadCommandLogMessageLevel } from './command-log-message-levels';

const WAD_LOG_ID_ALPHABET = 'abcd1234';
const WAD_LOG_ID_ALPHABET_SIZE = 4;
const generateLogMessageId = customAlphabet(WAD_LOG_ID_ALPHABET, WAD_LOG_ID_ALPHABET_SIZE);

export class WadCommandLogMessage {
  time = new Date();
  id = [this.time.getDate(), generateLogMessageId()].join('-');
  message!: string;
  level!: WadCommandLogMessageLevel;

  constructor(message: string, level: WadCommandLogMessageLevel = WadCommandLogMessageLevel.DEBUG) {
    this.message = message;
    this.level = level;
  }
}
