import {Slider} from "./slider";
import {ColorSlider} from "./color-slider";
import {ColorWheel} from "./color-wheel";

export class StartScene extends Phaser.Scene {

  preload(): void {
    this.load.svg("teslalogo", "assets/svg/Tesla_Motors.svg")
  }

  create(): void {
    let teslalogo = this.add.image(640, 360,"teslalogo");
    teslalogo.setScale(2);
    teslalogo.setInteractive();

    let timeline = this.tweens.createTimeline();
    timeline.add({
      targets: teslalogo,
      scaleX: 0,
      flipX: true,
      //x: 640,
      yoyo: true,
      duration: 1000,
    });

    timeline.add({
      targets: teslalogo,
      duration: 1000,
      scaleX: 0,
      flipX: true,
      yoyo: true
    });
    timeline.setTimeScale(0.5);
    timeline.play();

    timeline.setCallback('onComplete', () => {
      timeline.play();
    });

    let speedSlider = new Slider(this, 20, 40);
    speedSlider.visible(false);
    speedSlider.setAction(() => {
      timeline.setTimeScale(speedSlider.value / 10)
    });

    let colorWheel = new ColorWheel(200, 300, this);
    colorWheel.setAction(() => {
      teslalogo.setTint(colorWheel.color);
    });

    teslalogo.on('pointerup', () => {
      speedSlider.toggleVisible();
      colorWheel.toggleVisible();
    });


  }
}




