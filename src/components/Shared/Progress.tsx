/** @jsxImportSource theme-ui */

import { Box } from "theme-ui";
import * as CSS from 'csstype'

interface Props {
  color: CSS.Property.Color;
  progress: number;
}

export const Progress: React.FC<Props> = ({ color, progress }) => {
  return (
    <Box sx={{ padding: 0, height: "14px", variant: 'styles.borders.sketchy' }}>
      <div
        sx={{
          height: "10px",
          width: `${progress}%`,
          backgroundColor: color,
        }}
      />
    </Box>
  );
};
