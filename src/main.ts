import { Engine } from "excalibur";
// @ts-ignore
import { Resources } from "./resources";
import { Level } from "./scenes/level";

class Game extends Engine {
  constructor() {
    super({ width: 800, height: 600 });
  }
  initialize() {
    this.start().then(() => {
      this.add("level1", new Level());
      this.goToScene("level1");
    });
  }
}

export const game = new Game();
game.initialize();
game.setAntialiasing(false);
