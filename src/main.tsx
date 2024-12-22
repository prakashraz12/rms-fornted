import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// react imports
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.route";
import { ThemeProvider } from "./components/layouts/theme.layout";
import { Toaster } from "./components/ui/toaster";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
