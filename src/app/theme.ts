import type { Theme } from "theme-ui";

export const theme: Theme = {
  fonts: {
    body: "'Gloria Hallelujah', cursive",
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: [0, 4, 8, 16, 32, 64],
  fontSizes: [12, 14, 16, 18, 24, 32, 48, 64, 72],
  colors: {
    primary: "black",
    background: "white",
    text: "black",
    accent: "black",
    highlight: "#2b2b2b",
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
      },
      sketchSquare: {
        borderRadius: "255px 25px 225px 25px/25px 225px 25px 255px",
        borderWidth: "2px",
        borderStyle: "solid",
      },
    },
  },
  forms: {
    nakedInput: {
      fontFamily: "body",
      border: "none",
      resize: "none",
    },
    sketchyInput: {
      borderRadius: "255px 25px 225px 25px/25px 225px 25px 255px",
      display: "block",
      padding: "0.375rem 0.75rem",
      fontFamily: "body",
      fontSize: "1rem",
      fontWeight: "700",
      lineHeight: "1.5",
      color: "#212529",
      backgroundColor: "#fff",
      backgroundClip: "padding-box",
      border: "2px solid #333",
      appearance: "none",
      transition:
        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
      margin: "0 8px",
    },
    sketchySelect: {
      fontFamily: '"Gloria Hallelujah", cursive',
      display: "block",
      width: "100%",
      padding: "0.375rem 2.25rem 0.375rem 0.75rem",
      MozPaddingStart: "calc(0.75rem - 3px)",
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 1.5,
      color: "#212529",
      backgroundColor: "#fff",
      backgroundImage:
        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23333' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e\")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 0.75rem center",
      backgroundSize: "16px 12px",
      border: "2px solid #333",
      borderRadius: "55px 225px 15px 25px/25px 25px 35px 355px",
      transition:
        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
      appearance: "none",
      "&:invalid": {
        color: "gray",
      },
      option: {
        textTransform: "capitalize",
      },
      flex: "0 0 150px",
      margin: "0 8px 0 0",
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
