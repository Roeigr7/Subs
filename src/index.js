import * as React from "react";
import { AuthProvider } from "contexts/authContext";
import theme from "modules/theme";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ForgotPassword from "./pages/ForgotPassword";
import Privacy from "./pages/Privacy";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Terms from "./pages/Terms";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Home from "./Home";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "terms",
    element: <Terms />,
  },
  {
    path: "privacy",
    element: <Privacy />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
      </ThemeProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
