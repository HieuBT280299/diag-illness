import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";

function App() {
  const theme = createMuiTheme();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
