import "styles/global.scss";
import { Provider } from "react-redux";
import store from "redux/store";

import Home from "pages";

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
