import AppRouter from "@routes/AppRouter";
import { store, persistor } from "@store/store";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./services/axios-global.js";

import "@styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
