import {
  Actor,
  Circle,
  CollisionType,
  Color,
  Engine,
  Input,
  Rectangle,
  Shape,
  vec,
  Vector,
} from "excalibur";
import Config from "../util/config";
// @ts-ignore
import Between from "between.js";

enum MOVESPEED {
  "SLOW" = Config.gridSize,
  "JUMP" = Config.gridSize * 2,
}

export class Player extends Actor {
  facing = Vector.Down;
  isMoving = false;
  isJumping = false;
  jumpHeight: number = 0;

  constructor(startPosition: Vector) {
    super({
      pos: startPosition.add(vec(Config.gridSize / 2, Config.gridSize / 2)),
      width: Config.gridSize,
      height: Config.gridSize,
      color: Color.Black,
      collider: Shape.Box(Config.gridSize - 0.5, Config.gridSize - 0.5),
      collisionType: CollisionType.Active,
      anchor: Vector.Zero,
    });
  }

  onInitialize(_engine: Engine) {
    /*    const sprite = Resources.Sword.toSprite();
    const sprite2 = new Rectangle({
      width: Config.gridSize,
      height: Config.gridSize,
      color: Color.Blue,
    });*/
    /*    this.graphics.use(sprite, {
      anchor: Vector.Zero,
    });*/
    this.graphics.layers.create({ name: "shadow", order: -1 });
    this.graphics.layers.get("shadow").use(
      new Circle({
        radius: Config.gridSize / 3,
        color: Color.Black,
      })
    );
    this.setAnimation(Vector.Down);
  }

  update(engine: Engine, delta: number) {
    if (engine.input.keyboard.isHeld(Input.Keys.W)) {
      this.setAnimation(Vector.Up);
    } else if (engine.input.keyboard.isHeld(Input.Keys.A)) {
      this.setAnimation(Vector.Left);
    } else if (engine.input.keyboard.isHeld(Input.Keys.S)) {
      this.setAnimation(Vector.Down);
    } else if (engine.input.keyboard.isHeld(Input.Keys.D)) {
      this.setAnimation(Vector.Right);
    }
    super.update(engine, delta);
  }

  onPostUpdate(_engine: Engine, _delta: number) {
    this.graphics.layers.get("default").offset = vec(0, -this.jumpHeight);
    super.onPostUpdate(_engine, _delta);
  }

  setAnimation(direction: Vector) {
    this.facing = direction;
    this.animate(direction);
  }

  animate(direction: Vector) {
    if (direction.equals(Vector.Right)) {
      this.graphics.add(
        new Rectangle({
          width: Config.gridSize,
          height: Config.gridSize,
          color: Color.Blue,
        })
      );
    } else if (direction.equals(Vector.Up)) {
      this.graphics.add(
        new Rectangle({
          width: Config.gridSize,
          height: Config.gridSize,
          color: Color.Red,
        })
      );
    } else if (direction.equals(Vector.Left)) {
      this.graphics.add(
        new Rectangle({
          width: Config.gridSize,
          height: Config.gridSize,
          color: Color.Yellow,
        })
      );
    } else {
      this.graphics.add(
        new Rectangle({
          width: Config.gridSize,
          height: Config.gridSize,
          color: Color.Green,
        })
      );
    }
  }

  async move(direction: Vector, jump?: boolean) {
    this.isMoving = true;
    this.isJumping = jump || false;
    this.actions.clearActions();
    const target = this.pos.add(
      direction.scale(jump ? MOVESPEED.JUMP : MOVESPEED.SLOW)
    );

    return this.actions
      .callMethod(() => {
        this.heightAnimation(jump);
      })
      .moveTo(target, Config.moveSpeed)
      .callMethod(() => {
        this.isMoving = false;
        this.isJumping = false;
      })
      .asPromise();
  }

  tick(_engine: Engine) {
    if (_engine.input.keyboard.isHeld(Input.Keys.Space)) {
      this.move(this.facing, true);
    } else {
      this.move(this.facing);
    }
  }

  private heightAnimation(jump: boolean | undefined) {
    new Between(0, jump ? 30 : 8)
      .time(Config.moveDuration / 3)
      .easing(Between.Easing.Cubic.InOut)
      .on("update", (value: number) => {
        this.jumpHeight = value;
      })
      .on("complete", () => {
        new Between(jump ? 30 : 8, 0)
          .time(Config.moveDuration / 3)
          .easing(Between.Easing.Cubic.InOut)
          .on("update", (value: number) => {
            this.jumpHeight = value;
          });
      });
  }
}
