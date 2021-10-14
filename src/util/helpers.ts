import {vec, Vector} from "excalibur";
import Config from "./config";

function transformPositionToGrid(grid: Vector) {
  return vec(grid.x * Config.gridSize - Config.gridSize/2, grid.y * Config.gridSize - Config.gridSize/2);
}

export {
  transformPositionToGrid
}