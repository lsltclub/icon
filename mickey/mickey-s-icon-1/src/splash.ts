import { Rgba, Vector2d } from './paint-util';
import { randomFloat, randomInt } from './logic-util';


const COLOR_APLHA = 0.8;
const MIN_POLYGON_NUM = 8;
const MAX_POLYGON_NUM = 12;
const DISTORTION_RATIO = 0.1;
const MIN_SPIKE_RATIO = 0.5;
const MAX_SPILE_RATIO = 1.2;
const DROP_POSSSIBILITY = 0.3;
const MIN_DROP_RATIO = 0.5;
const MAX_DROP_RADIO = 1;

export class Splash {
  color: Rgba;

  constructor(
    public position: Vector2d,
    public r: number
  ) {
    this.color = Rgba.fromHsv(Math.random(), 1, 1);
    this.color.a = COLOR_APLHA;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const polygonNum = randomInt(MIN_POLYGON_NUM, MAX_POLYGON_NUM);
    const drawPoints = new Array(polygonNum)
      .fill(0)
      .map((_, idx) =>
        Math.PI * 2 / polygonNum * idx + randomFloat(-DISTORTION_RATIO, DISTORTION_RATIO)
      )
      .map(rad => new Vector2d(
        this.position.x + Math.cos(rad) * this.r,
        this.position.y + Math.sin(rad) * this.r
      ))
      .map((crnt, idx, arr) => {
        const next = arr[(idx + 1) % polygonNum];
        const diff = next.sub(crnt);
        const mid = crnt.add(diff.div(2));
        const rad = Math.atan2(diff.y, diff.x) - Math.PI / 2;
        const spikeTall = randomInt(this.r * MIN_SPIKE_RATIO, this.r * MAX_SPILE_RATIO);
        const spike = new Vector2d(
          mid.x + spikeTall * Math.cos(rad),
          mid.y + spikeTall * Math.sin(rad)
        );
        const spikeCtrl = mid.add(spike.sub(mid).div(2.5));
        const dropStart = spike.sub(spike.sub(mid).div(8));
        return { crnt, next, spike, spikeCtrl, dropStart };
      });
    
    ctx.save();
    ctx.strokeStyle = ctx.fillStyle = this.color.getCssString();
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(drawPoints[0].crnt.x, drawPoints[0].crnt.y);
    for (const { crnt, next, spike, spikeCtrl } of drawPoints) {
      ctx.bezierCurveTo(crnt.x, crnt.y, spikeCtrl.x, spikeCtrl.y, spike.x, spike.y);
      ctx.bezierCurveTo(spike.x, spike.y, spikeCtrl.x, spikeCtrl.y, next.x, next.y);
    }
    ctx.closePath();
    ctx.fill();
    for (const { dropStart } of drawPoints.slice(0, polygonNum / 2)) {
      if (randomInt(0, 1 / DROP_POSSSIBILITY) === 0) {
        const dropLength = randomInt(this.r * MIN_DROP_RATIO, this.r * MAX_DROP_RADIO);
        ctx.beginPath();
        ctx.moveTo(dropStart.x, dropStart.y);
        ctx.lineTo(dropStart.x, dropStart.y + dropLength);
        ctx.stroke();
      }
    }
    ctx.restore();
  }
}
