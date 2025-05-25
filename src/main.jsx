import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DataProvider } from "./Utility/DataProvider/DataProvider.jsx";
import { reducer, initialState } from "./Utility/reducer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </StrictMode>
);
// This code initializes a React application, rendering the main App component within a DataProvider context.