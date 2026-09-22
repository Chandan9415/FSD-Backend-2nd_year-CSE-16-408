import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Postman from "./component/postman.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Postman />
    </StrictMode>
);