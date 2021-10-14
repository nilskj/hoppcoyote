import { Engine, Loader, Scene, Timer, vec, Vector } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";
import { Pit } from "../actors/pit";
import Config from "../util/config";
import { CrumbleBlock } from "../actors/crumbleBlock";

export class Level extends Scene {
  private _loaded: boolean = false;
  private gameTimer: Timer;
  constructor() {
    super();
  }
  onInitialize(_engine: Engine) {
    super.onInitialize(_engine);

    const sceneLoader = new Loader([Resources.Sword, Resources.TiledMap]);
    _engine.start(sceneLoader).then(() => {
      this._loaded = true;

      const pit = new Pit(128, 128);
      this.add(pit);

      this.camera.zoom = 2;
      this.camera.pos = Vector.Zero;
      const player = new Player(vec(0, 0));
      this.add(player);
      this.camera.strategy.lockToActor(player);

      const trig = new CrumbleBlock({
        x: 64,
        y: 64,
        player,
      });
      this.add(trig);

      this.gameTimer = new Timer({
        fcn: () => {
          player.tick(_engine);
        },
        interval: Config.moveDuration,
        repeats: true,
      });

      this.add(this.gameTimer);
      this.gameTimer.start();
    });
  }
}
