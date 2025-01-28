import { createTheme } from "@mui/material";
import { typography } from "./themeSettings";

export const themeProvider = createTheme({
    colorSchemes: {
        dark: true,
    },
    typography: typography,
})