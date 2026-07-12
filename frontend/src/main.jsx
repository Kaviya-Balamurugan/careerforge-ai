import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CareerProvider } from "./context/CareerContext";

import App from "./App";

import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <CareerProvider>

    <BrowserRouter>

        <Toaster position="top-right" />

        <App />

    </BrowserRouter>

</CareerProvider>

    </React.StrictMode>
);