import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./storyblok";   // 👈 this initializes Storyblok

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
