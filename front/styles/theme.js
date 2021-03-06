import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#BE3F2A",
      light: "#E51B23",
    },
    secondary: {
      main: "#0000FF",
      light: "#2A3949",
    },
    textSecondary: {
      main: "#219653",
    },
    error: {
      main: red.A400,
    },
    success: {
      main: "#219653",
      light: "#23CE6B",
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: ["'Lato', sans-serif"].join(","),
    h1: { fontFamily: ["'Raleway', sans-serif"].join(",") },
    h2: { fontFamily: ["'Raleway', sans-serif"].join(",") },
    h3: { fontFamily: ["'Raleway', sans-serif"].join(",") },
    h4: { fontFamily: ["'Raleway', sans-serif"].join(",") },
    h5: { fontFamily: ["'Raleway', sans-serif"].join(",") },
    h6: { fontFamily: ["'Raleway', sans-serif"].join(",") },
    subtitle1: { fontFamily: ["'Raleway', sans-serif"].join(",") },
  },
});
