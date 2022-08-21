import "styles/global.scss";
import { Provider } from "react-redux";
import store from "src/redux/store";

import Home from "src/pages";

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
