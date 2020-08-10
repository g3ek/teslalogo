import Graphics = Phaser.GameObjects.Graphics;
import Pointer = Phaser.Input.Pointer;
import Image = Phaser.GameObjects.Image;

export class Slider {

  protected scene: Phaser.Scene;
  protected bar: Graphics;
  private button: Image;
  private action: () => void;
  private _value: number = 5;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.create(x, y);
  }

  create(x: number, y: number): void {
    this.createBar(x, y);

    let buttonGfx = this.scene.add.graphics({
      x: x+50,
      y: y,
      fillStyle: {
        color: 0xd9d9d9,
      },
    });
    buttonGfx.fillRect(0, 0, 20, 40);
    buttonGfx.generateTexture('sliderbuttontexture', 20, 40);
    buttonGfx.destroy();

    this.button = this.scene.add.image(x+50, y+5, 'sliderbuttontexture');
    this.button.setInteractive({
      draggable: true
    });
    this.button.setDepth(2);
    this.scene.input.setDraggable(this.button);

    this.button.on('drag', (pointer: Pointer, button: Image, dragX: number, dragY: number) => {
      if (pointer.x >= x+10 && pointer.x <= x+90) {
        this.button.setX(pointer.x);
        this._value = (pointer.x - x) / 10;
      }
    });
  }

  protected createBar(x: number, y: number): void {
    this.bar = this.scene.add.graphics({
      fillStyle: {
        color: 0xc0c0c0
      }
    });
    this.bar.fillRect(x, y, 100, 10);
  }

  visible(on: boolean) {
    this.bar.setVisible(on);
    this.button.setVisible(on);
  }

  toggleVisible(): void {
    this.bar.setVisible(!this.bar.visible)
    this.button.setVisible(!this.button.visible)
  }

  setAction(action: () => void) {
    this.button.on('dragend', action);
  }


  get value(): number {
    return this._value;
  }
}
