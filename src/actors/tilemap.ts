import { Actor, Engine, vec } from "excalibur";
import { Resources } from "../resources";

export class TileMap extends Actor {
  constructor() {
    super({ x: -32, y: -32, scale: vec(0.5, 0.5) });
  }

  onInitialize(_engine: Engine) {
    super.onInitialize(_engine);
    Resources.TiledMap.addTiledMapToScene(_engine.currentScene);
    _engine.currentScene.camera.zoom = 2;
  }
}
