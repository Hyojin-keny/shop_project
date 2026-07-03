import { createTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light", // replaces `type: 'light'` in MUI v5
    primary: {
      light: "#000000",
      main: "#000000",
      dark: "#000000",
      contrastText: "#fff",
    },
    secondary: {
      light: "#90D5FF",
      main: "#90D5FF",
      dark: "#90D5FF",
      contrastText: "#000",
    },
  },
  typography: {
    // `useNextVariants` is removed in MUI v5; it's on by default
  },
  custom: {
    openTitle: "#3f4771",
    protectedTitle: pink[400],
  },
});

export default theme;
