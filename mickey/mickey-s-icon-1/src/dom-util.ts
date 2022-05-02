import { Vector2d } from './paint-util';


export function getClickedPostiion(e: MouseEvent): Vector2d {
  const elm = e.target as HTMLElement;
  const rect = elm.getBoundingClientRect();
  return new Vector2d(
    e.clientX - rect.left,
    e.clientY - rect.top
  );
}
