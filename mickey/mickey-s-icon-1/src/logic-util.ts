export function randomInt(from: number, to: number) {
  return from + Math.floor(Math.random() * (to - from));
}

export function randomFloat(from: number, to: number) {
  return from + Math.random() * (to - from);
}
