import {Slider} from "./slider";
import {ColorSlider} from "./color-slider";
import {ColorWheel} from "./color-wheel";
import {Button} from "./button";

export class StartScene extends Phaser.Scene {

  preload(): void {
    this.load.svg("teslalogo", "assets/svg/Tesla_Motors.svg");
    this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
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

    let orientationButton = new Button(this, 20, 500, 185, 50, "Portrait");
    orientationButton.toggleVisible();
    orientationButton.setAction(() => {
      if (this.scale.gameSize.width === 1280) {
        //this.scale.stopFullscreen();
        this.scale.setGameSize(720, 1280);
        teslalogo.setScale(3.5);
        teslalogo.setX(360);
        teslalogo.setY(640); // why do I have to -60 ?!
        orientationButton.setText("Portrait");
      } else {
        //this.scale.startFullscreen();
        this.scale.setGameSize(1280, 720);
        teslalogo.setScale(2);
        teslalogo.setX(640); // why do I have to -60 ?!
        teslalogo.setY(360);
        orientationButton.setText("Landscape");
      }
    })



    teslalogo.on('pointerup', () => {
      speedSlider.toggleVisible();
      colorWheel.toggleVisible();
      orientationButton.toggleVisible();
    });
  }
}




