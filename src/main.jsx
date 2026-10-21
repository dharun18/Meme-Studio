import React from "react";
import ReactDOM from "react-dom/client";
import { MemeProvider } from "./context/MemeContext";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MemeProvider>
      <App />
    </MemeProvider>
  </React.StrictMode>
);