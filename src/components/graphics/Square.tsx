import React, { useEffect, useRef } from "react";
import rough from "roughjs/bin/rough";
import { Graphic } from "./data";

export const Square: React.FC<Graphic> = ({ x, y, size = 50, children }) => {
  const gElement = useRef<SVGGElement>(null);

  useEffect(() => {
    if (gElement.current) {
      gElement.current.innerHTML = "";
      const rc = rough.svg(gElement.current.closest("svg")!);
      const node = rc.rectangle(x, y, size, size, {
        fill: "white",
        fillStyle: "solid",
      });
      gElement.current.append(...Array.from(node.children));
    }
    return () => {
      if (gElement.current) {
        gElement.current.innerHTML = "";
      }
    };
  }, [x, y, gElement]);

  return (
    <>
      <g ref={gElement} style={{ cursor: "pointer" }}></g>
      <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100">
        {children}
      </svg>
    </>
  );
};
