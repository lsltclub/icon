import { Splash } from './splash';
import { randomInt } from './logic-util';
import { getClickedPostiion } from './dom-util';

const CANVAS_SIZE = 512;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

canvas.width = canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

canvas.addEventListener('click', (e) => {
  new Splash(getClickedPostiion(e), randomInt(10, 20)).draw(ctx);
});

