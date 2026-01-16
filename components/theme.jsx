"use client"
"use client";

import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

const theme = createTheme();

export default function MuiProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
