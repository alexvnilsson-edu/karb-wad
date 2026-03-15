import { WadCommandLogMessageLevel } from './log-message-levels';

export class WadCommandLogMessage {
  message!: string;
  level!: WadCommandLogMessageLevel;

  constructor(message: string, level: WadCommandLogMessageLevel = WadCommandLogMessageLevel.DEBUG) {
    this.message = message;
    this.level = level;
  }
}
