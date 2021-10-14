import {
  Actor,
  CollisionGroupManager,
  CollisionType,
  Color,
  Engine,
  Rectangle,
  Vector,
} from "excalibur";
import Config from "../util/config";
import { Player } from "./player";

export class Pit extends Actor {
  constructor(x: number, y: number) {
    super({
      name: "Pit",
      pos: new Vector(x, y),
      width: Config.gridSize,
      height: Config.gridSize,
      collisionType: CollisionType.Passive,
      collisionGroup: CollisionGroupManager.groupByName("pit"),
      color: Color.Red,
      anchor: Vector.Zero,
    });
  }
  onInitialize(_engine: Engine) {
    super.onInitialize(_engine);

    this.on("precollision", (event) => {
      if (event.other instanceof Player && !event.other.isMoving) {
        console.log("die");
      }
    });

    this.graphics.use(
      new Rectangle({
        width: Config.gridSize,
        height: Config.gridSize,
        color: Color.Red,
      }),
      {
        anchor: Vector.Zero,
      }
    );
  }
}
