import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../src/context/AuthContext";
import ReportProvider from "../src/context/ReportCotne";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ReportProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReportProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
