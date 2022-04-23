export class Vector2d {
  constructor(
    public x: number,
    public y: number
  ) {}

  add(v: Vector2d) {
    return new Vector2d(
      this.x + v.x,
      this.y + v.y
    );
  }

  sub(v: Vector2d) {
    return new Vector2d(
      this.x - v.x,
      this.y - v.y
    );
  }

  div(n: number) {
    return new Vector2d(
      this.x / n,
      this.y / n
    );
  }
}

export class Rgba {
  constructor(
    public r: number,
    public g: number,
    public b: number,
    public a = 1
  ) {}

  static fromHsv(h: number, s: number, v: number) {
    const [r, g, b] = hsvToRgb(h, s, v);
    return new Rgba(
      Math.floor(r * 255),
      Math.floor(g * 255),
      Math.floor(b * 255)
    );
  }

  getCssString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}

function hsvToRgb(
  h: number,
  s: number,
  v: number
): [number, number, number] {
  let r = v;
  let g = v;
  let b = v;
  if (s > 0) {
    h *= 6;
    const i = Math.floor(h);
    const f = h - i;
    switch (i) {
      default:
      case 0:
        g *= 1 - s * (1 - f);
        b *= 1 - s;
        return [r, g, b];
      case 1:
        r *= 1 - s * f;
        b *= 1 - s;
        return [r, g, b];
      case 2:
        r *= 1 - s;
        b *= 1 - s * (1 - f);
        return [r, g, b];
      case 3:
        r *= 1 - s;
        g *= 1 - s * f;
        return [r, g, b];
      case 4:
        r *= 1 - s * (1 - f);
        g *= 1 - s;
        return [r, g, b];
      case 5:
        g *= 1 - s;
        b *= 1 - s * f;
        return [r, g, b];
    }
  }
  return [r, g, b];
}
