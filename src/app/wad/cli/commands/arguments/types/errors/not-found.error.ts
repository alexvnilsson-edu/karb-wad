import { WadCommandArgument } from '../../command-argument';

export class WadCommandArgumentTypeNotFoundError extends Error {
  override name = 'WadCommandArgumentTypeNotFound';

  type!: string;

  /**
   * Creates an instance of WadCommandArgumentTypeUndefinedError.
   *
   * @constructor
   * @param {string} type Name of argument type that was queried.
   * @param {string} message Additional message.
   */
  constructor(type: string, message = `${WadCommandArgument.name} not found error.`) {
    super(message);
    this.type = type;
  }
}
