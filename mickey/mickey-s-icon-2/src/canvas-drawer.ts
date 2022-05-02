import { Position, getMousePostiion } from './dom-util';

export class CanvasDrawer {
  private ctx: CanvasRenderingContext2D;
  private canvasPushed = false;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    canvas.addEventListener('mousedown', (e) => {
      this.canvasPushed = true;
      this.draw(getMousePostiion(e));
    });
    canvas.addEventListener('mouseup', (e) => {
      this.canvasPushed = false;
    });
    canvas.addEventListener('mousemove', (e) => {
      if (this.canvasPushed) {
        this.draw(getMousePostiion(e));
      }
    });
    this.clear();
  }

  clear() {
    const { ctx } = this;
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.restore();
  }

  draw({ x, y }: Position) {
    const { ctx } = this;
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  getImageData() {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

}
