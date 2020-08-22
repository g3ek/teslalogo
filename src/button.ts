import Graphics = Phaser.GameObjects.Graphics;
import BitmapText = Phaser.GameObjects.BitmapText;

export class Button {

  private scene: Phaser.Scene;
  private graphics: Graphics;
  private text: BitmapText;
  private action: () => void;

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, text: string) {
    this.scene = scene;
    this.create(x, y, width, height, text);
  }

  private create(x: number, y: number, width: number, height: number, text: string) {
    this.text = this.scene.add.bitmapText(x+5, y+10, "atari", text);
    this.text.setScale(0.3);
    this.graphics = this.scene.add.graphics({
      x: x,
      y: y,
      fillStyle: {
        color: 0xd9d9d9,
      },
    });

    this.graphics.fillRect(0, 0, width, height);
    this.text.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    this.graphics.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    this.text.setDepth(2);
    this.text.on('pointerup', () => {
      this.action();
    });
    this.graphics.on('pointerup', () => {
      this.action();
    })
  }

  setAction(action: () => void) {
    this.action = action;
  }

  toggleVisible(): void {
    this.text.setVisible(!this.text.visible)
    this.graphics.setVisible(!this.graphics.visible)
  }

  setText(text: string) {
    this.text.setText(text);
  }
}
