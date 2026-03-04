import { Coordinate } from "app/wad/rendering/coordinate";
import { CoordinatesTransformer } from "app/wad/transformers/coordinates.transformer";
import { ArgumentType } from "./argument-type";

export class CoordinatesArgumentType extends ArgumentType<Coordinate> {
  constructor() {
    super("coordinates", CoordinatesTransformer.create());
  }
}
