import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";

import { Provider as ReduxProvider } from "react-redux";
import reduxStore, { persistedStore } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

// import App from "./App.jsx";
import MyRouter from "./Router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider store={reduxStore}>
      <PersistGate loading={null} persistor={persistedStore}>
        <MyRouter />
      </PersistGate>
    </ReduxProvider>
  </StrictMode>,
);
