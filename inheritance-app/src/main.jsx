import {BrowserRouter} from "react-router-dom";
import ReactDom from "react-dom/client";
import App from "./App";
import "./index.css";
import React from "react";

ReactDom.createRoot(document.getElementById("root")).render(
<React.StrictMode>

<App/>
</React.StrictMode>
);