export interface Position {
  x: number;
  y: number;
}

export function getMousePostiion(e: MouseEvent): Position {
  const elm = e.target as HTMLElement;
  const rect = elm.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}
