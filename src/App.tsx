import { Provider } from "react-redux";
import store from "./redux/store";

import Home from "./pages";

import "./styles/normalize.css";
import "./styles/variables.css";
import "./styles/global.css";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
