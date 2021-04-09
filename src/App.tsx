import "./App.css";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { ConfigureStore } from "./redux/store/configureStore";
import { Provider } from "react-redux";

const store = ConfigureStore();

function App() {
  const theme = createMuiTheme();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
