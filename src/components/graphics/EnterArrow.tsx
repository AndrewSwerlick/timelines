import React from "react";
import { Graphic } from "./data";

export const EnterArrow: React.FC<Graphic> = ({ x, y, size, onClick }) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 77.67033481143244 82.21821045467414"
      width={size}
      height={size}
    >
      <g stroke-linecap="round">
        <g transform="translate(81.6225678027613 51.826373434581) rotate(288.01646691493636 -36.414427279166375 -8.644538556406019)">
          <path
            d="M2.09 2.45 C-11.03 5.03, -16.12 3.62, -46.26 16.43 M-0.55 -1.82 C-12.57 1.81, -22.31 6.52, -50 16.39 M-45.23 15.57 C-51.08 7.32, -58.11 -5.78, -74.92 -33.15 M-49.16 14.89 C-56.78 -4.04, -64.8 -20.32, -71.23 -33.72"
            stroke="#000000"
            stroke-width="4"
            fill="none"
          ></path>
        </g>
        <g transform="translate(81.6225678027613 51.826373434581) rotate(288.01646691493636 -36.414427279166375 -8.644538556406019)">
          <path
            d="M-49.19 -11.77 C-56.31 -16.92, -55.52 -25.62, -69.12 -32.99 M-51.83 -16.04 C-56.92 -19.69, -60.38 -22.77, -72.86 -33.03"
            stroke="#000000"
            stroke-width="4"
            fill="none"
          ></path>
        </g>
        <g transform="translate(81.6225678027613 51.826373434581) rotate(288.01646691493636 -36.414427279166375 -8.644538556406019)">
          <path
            d="M-66.39 -3.51 C-69.92 -10.62, -65.56 -21.04, -69.12 -32.99 M-69.03 -7.78 C-70.16 -12.94, -69.82 -17.85, -72.86 -33.03"
            stroke="#000000"
            stroke-width="4"
            fill="none"
          ></path>
        </g>
      </g>
    </svg>
  );
};
