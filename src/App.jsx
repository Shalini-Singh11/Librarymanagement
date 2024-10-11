import { ThemeProvider } from "@mui/material/styles";
import { ColorModeContext, useMode } from "./theme/theme";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom"; 
import MainRouter from "./routes/Mainrouter"; 
import "./App.css";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <StyledEngineProvider injectFirst>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter> 
            <MainRouter />
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StyledEngineProvider>
  );
};

export default App;
