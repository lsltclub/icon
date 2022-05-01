export class LinePainter {
  private ctx: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.clear();
  }

  clear() {
    const { ctx } = this;
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.restore();
  }

  private getIdxFromPosition(x: number, y: number) {
    return y * 4 * this.canvas.width + x * 4;
  }

  draw(srcData: ImageData) {
    const { ctx } = this;
    const { data } = srcData;
    ctx.save();
    let prevLighter = false;
    for (let y = 0; y <= this.canvas.height; y += 8) {
      for (let x = 4; x <= this.canvas.width; x += 4) {
        const idx = this.getIdxFromPosition(x, y);
        ctx.strokeStyle = data[idx] || prevLighter ? '#0f0' : '#040';
        ctx.beginPath();
        ctx.moveTo(x - 4, prevLighter ? y - 4 : y);
        ctx.lineTo(x, data[idx] ? y - 4 : y);
        ctx.stroke();
        prevLighter = Boolean(data[idx]);
      }
    }
    prevLighter = false;
    for (let x = 0; x <= this.canvas.width; x += 8) {
      for (let y = 4; y <= this.canvas.height; y += 4) {
        const idx = this.getIdxFromPosition(x, y);
        ctx.strokeStyle = data[idx] || prevLighter ? '#0f0' : '#040';
        ctx.beginPath();
        ctx.moveTo(prevLighter ? x + 4 : x, y - 4);
        ctx.lineTo(data[idx] ? x + 4 : x, y);
        ctx.stroke();
        prevLighter = Boolean(data[idx]);
      }
    }
    ctx.restore();
  }
}
