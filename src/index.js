import React from "react";
import { routes } from "ComponentRenderer";
import ProtectedRoute from "components/routes/ProtectedRoute";
import PublicRoute from "components/routes/PublicRoute";
import { AuthProvider } from "contexts/authContext";
import HomePage from "demos/HomePage";
import LoginPage from "pages/Login";
import SignupPage from "pages/Signup";
import { createRoot } from "react-dom/client";
import Modal from "react-modal";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";

Modal.setAppElement("#root");

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: routes.auth.loginPage.url,
    element: (
      <PublicRoute>
        <LoginPage />{" "}
      </PublicRoute>
    ),
  },
  {
    path: routes.auth.signupPage.url,
    element: (
      <PublicRoute>
        <SignupPage />
      </PublicRoute>
    ),
  },
]);
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <App />
    </AuthProvider>
  </React.StrictMode>
);
