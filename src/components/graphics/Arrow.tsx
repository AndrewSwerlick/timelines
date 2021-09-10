import React, { useEffect, useRef } from "react";
import rough from "roughjs/bin/rough";

interface Line {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

function findPoint(
  start: { x: number; y: number },
  end: { x: number; y: number },
  angle: number,
  length: number
) {
  var lineAngle = Math.atan2(end.y - start.y, end.x - start.x);
  var pointAngle = (angle * Math.PI) / 180 + lineAngle;

  var nx = end.x + Math.cos(pointAngle) * length;
  var ny = end.y + Math.sin(pointAngle) * length;

  return { x: nx, y: ny };
}

export const Arrow: React.FC<Line> = ({ start, end }) => {
  const svgElement = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgElement.current) {
      svgElement.current.innerHTML = "";
      const rc = rough.svg(svgElement.current);
      let line = rc.line(start.x, start.y, end.x, end.y);
      const headPoint1 = findPoint(start, end, 25, -10);
      let head1 = rc.line(end.x, end.y, headPoint1.x, headPoint1.y);

      const headPoint2 = findPoint(start, end, 335, -10);
      let head2 = rc.line(end.x, end.y, headPoint2.x, headPoint2.y);

      svgElement.current.appendChild(line);
      svgElement.current.appendChild(head1);
      svgElement.current.appendChild(head2);
    }
  }, [start.x, start.y, end.x, end.y]);

  return <svg ref={svgElement}></svg>;
};
