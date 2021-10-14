import { ImageSource } from "excalibur";
import sword from "./images/sword.png";
import * as tiled from "@excaliburjs/plugin-tiled"; // for parcelv2 this is configured in the .parcelrc
/*tiledMapResource.addTiledMapToScene(this.currentScene);*/
let Resources = {
  Sword: new ImageSource(sword),
  // @ts-ignore
  TiledMap: new tiled.TiledMapResource("json.json"),
};

export { Resources };
