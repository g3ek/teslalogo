import {Scene} from "phaser";
import ColorObject = Phaser.Types.Display.ColorObject;
import DegToRad = Phaser.Math.DegToRad;
import Pointer = Phaser.Input.Pointer;
import Map = Phaser.Structs.Map;
import Rectangle = Phaser.Geom.Rectangle;
import RadToDeg = Phaser.Math.RadToDeg;
import Graphics = Phaser.GameObjects.Graphics;

export class ColorWheel {

  private colorMap: Map<number, Rectangle>;
  private _color: number;
  private action: () => void;
  private wheel: Graphics;

  constructor(x: number, y: number, scene: Scene) {
    this.create(x, y, scene);
  }

  private create(x: number, y: number, scene: Phaser.Scene) {
    let colors = Phaser.Display.Color.HSVColorWheel(1, 1);
    this.wheel = scene.add.graphics();
    this.wheel.setVisible(false);
    this.wheel.setInteractive(new Phaser.Geom.Circle(x, y, 150), Phaser.Geom.Circle.Contains);
    let r0 = 50, r1 = 150;
    colors.forEach((colorObject: ColorObject, index: number) => {
      let a = DegToRad(index);
      let cosA = Math.cos(a);
      let sinA = Math.sin(a);
      let color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b);
      this.wheel.lineStyle(3, color);
      this.wheel.lineBetween(
        x + (r0 * cosA),
        y + (r0 * sinA),
        x + (r1 * cosA),
            y + (r1 * sinA))
    });

    this.wheel.on('pointerup', (pointer: Pointer) => {
      let angle = Phaser.Math.Angle.Between(x, y, pointer.x, pointer.y);
      let deg = RadToDeg(angle);
      if (deg < 0) {
        deg = 360 - Math.abs(deg);
      }
      let colorObject = colors[Math.round(deg)];
      this._color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b);
      this.action();
    });
  }

  setAction(action: () => void) {
    this.action = action;
  }

  get color(): number {
    return this._color;
  }

  toggleVisible(): void {
    this.wheel.setVisible(!this.wheel.visible);
  }
}
