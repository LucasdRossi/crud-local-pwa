import Router from "./routes";

import ThemeProvider from "./theme";
import AuthContextProvider from "./context/auth";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
