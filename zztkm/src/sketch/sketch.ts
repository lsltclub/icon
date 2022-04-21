import p5 from 'p5';

// sample code refs: https://paper.dropbox.com/doc/Fk8qxFWjaJWeH1cAc8FT0
const sketch = (p: p5) => {

	let colors = ["#D9ED92", "#B5E48C", "#99D98C", "#76C893", "#52B69A", "#34A0A4", "#168AAD", "#1A759F", "#1E6091", "#184E77"];

	/** 初期化 */
	p.setup = () => {
		p.createCanvas(800, 800);
		p.colorMode(p.HSB, 360, 100, 100, 100);
		p.angleMode(p.DEGREES);
		p.background(0, 0, 90);

		drawDot();

		let cells = p.int(p.random(3, 15));
		let offset = p.width / 10;
		let margin = offset / 5;
		let w = (p.width - offset * 2 - margin * (cells - 1)) / cells;
		let h = (p.height - offset * 2 - margin * (cells - 1)) / cells;

		//格子状に図形を配置する基本的な方法
		//2重for文で縦横方向にxyの位置を計算し，その位置を基準に図形を配置する
		for (let j = 0; j < cells; j++) {
			for (let i = 0; i < cells; i++) {
				let x = offset + i * (w + margin);
				let y = offset + j * (h + margin);

				let cx = x + w / 2;
				let cy = y + h / 2;
				let d = w;
				let c = p.random(colors); // ランダムに色を決定
				let rotate_num = p.int(p.random(4)); // 0〜3の整数
				rotate_num = rotate_num * 90; // 0,90,180,270
				let shape_num = p.int(p.random(4));

				p.push();
				p.translate(cx, cy);
				p.rotate(rotate_num);

				if (p.random(100) > 50) {
					p.noStroke();
					p.fill(c);
				} else {
					p.noFill();
					p.stroke(c);
				}

				// ランダムな図形の描画
				if (shape_num == 0) {
					p.triangle(-d / 2, -d / 2, d / 2, -d / 2, -d / 2, d / 2);
				} else if (shape_num == 1) {
					p.rectMode(p.CENTER);
					p.rect(0, 0, d, d);
				} else if (shape_num == 2) {
					p.ellipse(0, 0, d, d);
				} else if (shape_num == 3) {
					p.arc(-d / 2, -d / 2, d * 2, d * 2, 0, 90);
				}

				p.pop();
			}
		}
	};

	/** フレームごとの描画処理 */
	p.draw = () => { };

	/** スケッチデータを png で保存する */
	p.keyPressed = () => {
		if (p.key == 's') {
			let timeStamp = p.year() + "-" + p.month() + "-" + p.day() + "-" + p.hour() + "-" + p.minute() + "-" + p.second() + "-" + p.nf(p.millis(), 3, 0);
			p.save(timeStamp + 'png');
		}
	}

	/** 画面上にたくさんの点を打って粒状感を背景に加える */
	const drawDot = () => {
		for (let i = 0; i < p.width * p.height * 5 / 100; i++) {
			//半透明の点，白でも黒でもOK．透明度は適宜調整する
			p.stroke(0, 0, 0, 10);
			let px = p.random(p.width);
			let py = p.random(p.height);
			p.point(px, py);
		}
	}
};

new p5(sketch)