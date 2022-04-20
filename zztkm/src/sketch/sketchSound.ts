declare const p5: any; // これだと動く
// import p5 from "p5"; // こっちは動かない
import "p5/lib/addons/p5.sound";

const sketch = (p: p5) => {

	let mic: any;

	/** 初期化 */
	p.setup = () => {
		p.createCanvas(p.windowWidth, p.windowHeight);

		mic = new p5.AudioIn();
		mic.start();
	};

	/** フレームごとの描画処理 */
	p.draw = () => {
		let volume = mic.getLevel();
		let d = volume * 400;

		p.ellipse(p.frameCount * 3.3 % p.width, p.frameCount * 2.5 % p.height, d, d);
	};
};

new p5(sketch)