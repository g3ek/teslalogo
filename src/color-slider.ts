import {Slider} from "./slider";

export class ColorSlider extends Slider {


  protected createBar(x: number, y: number) {
    this.bar = this.scene.add.graphics();
    this.bar.fillGradientStyle(0x00ff00, 0xff0000, 0x0000ff, 0xffff00, 1);
    this.bar.fillRect(x, y, 100, 10);
  }
}
