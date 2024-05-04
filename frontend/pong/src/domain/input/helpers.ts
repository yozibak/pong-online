import { DefaultWidth } from "../../config";
import { Position } from "../../data/types";

export const whichSideIsBallOn = (ballPosition: Position) => {
  if (ballPosition.x < DefaultWidth/2) return 1
  else return 2
}