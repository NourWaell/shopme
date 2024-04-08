import AppRouter from "@routes/AppRouter";
import { store } from "@store/store";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "@styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
