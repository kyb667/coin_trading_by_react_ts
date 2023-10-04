import { Provider } from "react-redux";
import store from "./store";
import TopPageContainer from "./components/TopPageContainers";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <TopPageContainer />
      </BrowserRouter>
    </Provider>
  );
}
