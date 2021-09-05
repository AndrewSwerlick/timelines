import { MouseEventHandler } from "react";

export interface Graphic {
  x: number;
  y: number;
  size: number;
  onClick?: MouseEventHandler<SVGRectElement>;
}
