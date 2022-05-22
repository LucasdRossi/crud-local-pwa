import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import theme from "./theme";

export default function ThemeProvider(props) {
  return <MUIThemeProvider theme={theme}>{props.children}</MUIThemeProvider>;
}
