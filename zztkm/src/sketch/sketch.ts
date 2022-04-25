import p5 from 'p5';


// sample code refs: https://paper.dropbox.com/doc/Fk8qxFWjaJWeH1cAc8FT0
const sketch = (p: p5) => {

	//const squareStates: SquareState[] = [];

	/** 初期化 */
	p.setup = () => {
		p.createCanvas(512, 512);
		p.textAlign(p.CENTER, p.CENTER);
		p.textFont("ZCOOL QingKe HuangYou");
		p.textSize(130);
		p.strokeJoin(p.ROUND);
	};

	/** フレームごとの描画処理 */
	p.draw = () => {
		p.blendMode(p.BLEND);
		p.background(0);

		p.translate(p.width / 2, p.height / 2);

		p.blendMode(p.ADD);
		if (p.random(100) < 10) {
			p.stroke(0, 0, 50);
		} else {
			p.stroke(0, 0, 255);
		}

		let ctx = p.drawingContext.canvas.getContext("2d")
		// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor
		if (ctx) {
			p.push();
			ctx.shadowColor = p.color(0, 0, 255).toString();
			ctx.shadowBlur = 40;
			p.strokeWeight(6);
			p.noFill();
			p.text("LS\nLT", 0, 0);
			p.stroke(255, 255, 255, 220);
			p.strokeWeight(3);
			ctx.shadowBlur = 0;
			p.text("LS\nLT", 0, 0);
			p.pop();
		} else {
			p.push();
			p.strokeWeight(6);
			p.noFill();
			p.text("LS\nLT", 0, 0);
			p.stroke(255, 255, 255, 220);
			p.strokeWeight(3);
			p.text("LS\nLT", 0, 0);
			p.pop();
		}
	};

	/** スケッチデータを png で保存する */
	p.keyPressed = () => {
		if (p.key == 's') {
			let timeStamp = p.year() + "-" + p.month() + "-" + p.day() + "-" + p.hour() + "-" + p.minute() + "-" + p.second() + "-" + p.nf(p.millis(), 3, 0);
			p.save(timeStamp + 'png');
		}
	}
};

new p5(sketch)