"use client";

import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import RefreshDFSBalance from "@/components/RefreshDFSBalance";

const muiTheme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MUIThemeProvider theme={muiTheme}>
      <HeroUIProvider>
        <ToastProvider />
        {children}
        <RefreshDFSBalance />
      </HeroUIProvider>
    </MUIThemeProvider>
  );
}
