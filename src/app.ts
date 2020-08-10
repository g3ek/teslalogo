import "phaser";
import GameConfig = Phaser.Types.Core.GameConfig;
import ScaleModes = Phaser.Scale.ScaleModes;
import Center = Phaser.Scale.Center;
import {StartScene} from "./start-scene";

const config: GameConfig = {
  title: "Tesla Motors Logo",
  width: 1280,
  height: 720,
  parent: "game",
  backgroundColor: "#0a0a0a",
  scene: [StartScene],
  dom: {
    createContainer: true
  },
  scale: {
    parent: "game",
    mode: ScaleModes.FIT,
    autoCenter: Center.CENTER_BOTH
  }

};

export class TeslaBrowser extends Phaser.Game {

  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var thegame = new TeslaBrowser(config);
};
