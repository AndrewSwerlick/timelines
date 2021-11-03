import React from "react";
import { Graphic } from "./data";

export const CirclePlus: React.FC<Graphic> = (props) => {
  return <CircleButton {...props} character="+" />;
};

export const CircleMinus: React.FC<Graphic> = (props) => {
  return <CircleButton {...props} character="-" />;
};

export const CircleButton: React.FC<Graphic & { character: string }> = ({
  x,
  y,
  size,
  onClick,
  character,
}) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x={x}
      y={y}
      viewBox="0 0 46 66"
      width={size}
      height={size}
    >
      <g stroke-linecap="round" transform="translate(10 17.5) rotate(0 13 14)">
        <path
          d="M9.83 1.3 C12.62 0.2, 16.91 -0.62, 19.34 0.62 C21.76 1.87, 23.24 5.98, 24.37 8.77 C25.51 11.55, 26.69 14.68, 26.15 17.33 C25.6 19.99, 23.45 22.89, 21.09 24.71 C18.73 26.52, 14.87 28.35, 11.99 28.22 C9.11 28.1, 5.68 26.1, 3.82 23.96 C1.96 21.81, 1.18 18.27, 0.82 15.34 C0.46 12.41, -0.03 9.02, 1.65 6.37 C3.32 3.73, 9.26 0.5, 10.88 -0.53 C12.5 -1.55, 11.3 -0.07, 11.39 0.22 M8.65 0.24 C10.92 -0.58, 15.26 0, 17.83 1.29 C20.4 2.57, 22.66 5.14, 24.06 7.93 C25.45 10.72, 26.69 15.22, 26.2 18.05 C25.72 20.88, 23.35 23.47, 21.15 24.91 C18.95 26.36, 16.02 26.92, 13.01 26.71 C10.01 26.49, 5.25 25.78, 3.12 23.62 C0.98 21.47, 0.09 16.76, 0.19 13.8 C0.29 10.83, 2.22 8.08, 3.72 5.81 C5.23 3.54, 8.33 1.14, 9.23 0.2 C10.12 -0.74, 8.72 -0.24, 9.08 0.17"
          stroke="#000000"
          stroke-width="1"
          fill="none"
        ></path>
      </g>
      <g transform="translate(11.5 10) rotate(0 11.5 23)">
        <text
          x="11.5"
          y="32"
          font-family="Virgil, Segoe UI Emoji"
          font-size="36px"
          fill="#000000"
          text-anchor="middle"
          style={{ whiteSpace: "pre" }}
          direction="ltr"
        >
          {character}
        </text>
      </g>
      <rect
        x={0}
        y={0}
        width={100}
        height={100}
        strokeOpacity={0}
        onClick={onClick}
        fillOpacity={0}
        style={{ cursor: "pointer" }}
      />
    </svg>
  );
};
