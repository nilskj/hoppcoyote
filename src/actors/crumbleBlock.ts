import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Rectangle,
  vec,
  Vector,
} from "excalibur";
import Config from "../util/config";
import { Player } from "./player";

export class CrumbleBlock extends Actor {
  private life: number = 3;
  private player: Actor;

  constructor({ x, y, player }: { x: number; y: number; player: Actor }) {
    super({
      name: "CrumbleBlock",
      pos: new Vector(x, y).add(vec(Config.gridSize / 2, Config.gridSize / 2)),
      width: Config.gridSize / 2,
      height: Config.gridSize / 2,
      collisionType: CollisionType.Passive,
    });
    this.player = player;
    this.on("collisionend", (event) => {
      if (event.other instanceof Player && !event.other.isJumping) {
        this.life--;
        if (this.life === 0) {
          this.kill();
        }
      }
    });
  }

  onInitialize(_engine: Engine) {
    super.onInitialize(_engine);

    this.graphics.use(
      new Rectangle({
        width: Config.gridSize,
        height: Config.gridSize,
        color: Color.Green,
      }),
      {}
    );
  }
}
