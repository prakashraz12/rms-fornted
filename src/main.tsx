import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// react imports
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.route";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
