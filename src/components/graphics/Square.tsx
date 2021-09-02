import React, { useEffect, useRef } from "react";
import rough from "roughjs/bin/rough";

export const Square: React.FC<{ x: number; y: number; size: number }> = ({
  x,
  y,
  size = 50,
}) => {
  const gElement = useRef<SVGGElement>(null);
  useEffect(() => {
    if (gElement.current) {
      gElement.current.innerHTML = "";
      const rc = rough.svg(gElement.current.closest("svg")!);
      const node = rc.rectangle(x, y, size, size);
      gElement.current.append(...Array.from(node.children));
    }
    return () => {
      if (gElement.current) {
        gElement.current.innerHTML = "";
      }
    };
  }, [x, y, gElement]);

  return <g ref={gElement}></g>;
};
