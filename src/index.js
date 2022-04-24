import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "features/store";
import { initialBoards } from "features/slices/boardsSlice";
import App from "./App";
import "./index.css";

if (!localStorage.getItem("boards")) {
  store.dispatch(initialBoards());
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
