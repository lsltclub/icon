import { CanvasDrawer } from './canvas-drawer';
import { LinePainter } from './line-painter';


const CANVAS_SIZE = 512;


const inputCanvas = document.getElementById('input-canvas') as HTMLCanvasElement;
const resultCanvas = document.getElementById('result-canvas') as HTMLCanvasElement;
const resetBtn = document.getElementById('reset') as HTMLButtonElement;
const drawBtn = document.getElementById('draw') as HTMLButtonElement;

inputCanvas.width = inputCanvas.height = CANVAS_SIZE;
resultCanvas.width = resultCanvas.height = CANVAS_SIZE;

const inputDrawer = new CanvasDrawer(inputCanvas);
const resultPainter = new LinePainter(resultCanvas);

resetBtn.addEventListener('click', inputDrawer.clear.bind(inputDrawer));
drawBtn.addEventListener('click', () => {
  resultPainter.clear();
  resultPainter.draw(inputDrawer.getImageData())
});

const ctx = inputCanvas.getContext('2d')!
ctx.font = `bold 240px 'Consolas'`;
ctx.fillStyle = 'white';
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.fillText('lslt', CANVAS_SIZE / 2, CANVAS_SIZE / 2);
