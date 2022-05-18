import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./Routes/routes";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor = persistStore(store);
import "./App.css"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes/>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
