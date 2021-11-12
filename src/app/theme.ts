import type { Theme } from "theme-ui";

export const theme: Theme = {
  fonts: {
    body: "'Gloria Hallelujah', cursive",
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  colors: {
    primary: "black",
    background: "white",
    text: "black",
    accent: "black",
    highlight: "black",
    muted: "white",
    pass: "#28a745",
  },
  styles: {
    root: {
      fontFamily: "body",
    },
    borders: {
      sketchy: {
        borderWidth: "2px",
        borderStyle: "solid",
        borderRadius: "25px 25px 55px 5px/5px 55px 25px 25px",
        boxSizing: "border-box",
      },
    },
  },
  buttons: {
    primary: {
      fontFamily: "body",
      color: "primary",
      backgroundColor: "background",
      borderWidth: "2px",
      borderStyle: "solid",
      borderRadius: "255px 25px 225px 25px/25px 225px 25px 255px",
      boxSizing: "border-box",
      margin: 2,
    },
  },
};
