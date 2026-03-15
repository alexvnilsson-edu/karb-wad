import { WadCommandArgumentType } from '../arguments/types/argument-type';
import { WadCoordinatesArgumentType } from '../arguments/types/coordinates.argument-type';
import { WadCommandArgumentTypeNotFoundError } from '../arguments/types/errors';
import { WadNumberArgumentType } from '../arguments/types/number.argument-type';
import { WadCommandArgumentTypes } from '../command.type';

export interface WadCommandArgumentConfig {
  name: string;
  description: string;
  type: WadCommandArgumentTypes;
}

/**
 * Command argument type map.
 */
export const wadCommandArgumentTypes = new Map<
  WadCommandArgumentTypes,
  WadCommandArgumentType<unknown>
>([
  ['number', new WadNumberArgumentType()],
  ['coordinate', new WadCoordinatesArgumentType()],
]);

/**
 * Description placeholder
 *
 * @param {WadCommandArgumentTypes} type
 * @returns {(WadCommandArgumentType<unknown>)} Returns argument type if it exists.
 * @throws {WadCommandArgumentTypeNotFoundError} Thrown if argument type does not exist.
 */
export function getCommandArgumentType(
  type: WadCommandArgumentTypes,
): WadCommandArgumentType<unknown> | undefined {
  if (!wadCommandArgumentTypes.has(type)) {
    throw new WadCommandArgumentTypeNotFoundError(type);
  }
  return wadCommandArgumentTypes.has(type) ? wadCommandArgumentTypes.get(type) : undefined;
}

export function configureCommandArgument(
  name: string,
  description: string,
  type: WadCommandArgumentTypes,
): WadCommandArgumentConfig {
  return {
    name,
    description,
    type,
  };
}
