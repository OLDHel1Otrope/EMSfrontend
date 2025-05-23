import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";
import { About } from "./pages/About.js";
import { Admin } from "./pages/Admin.tsx";
import { UserContextProvider } from "./contexts/UserContextProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoutes.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./utils/queryClient.ts";
import { ToastProvider } from "./contexts/CustomToast.tsx";
import { AuthPage } from "./pages/Auth.tsx";
import AdminRoute from "./components/AdminRoute.tsx";
import { Me } from "./pages/Me.tsx";
import MyLeavesPage from "./components/MyLeaves.tsx";






ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin"
                  element={
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  }
                />
                <Route
                  path="me"
                  element={
                    <ProtectedRoute>
                      <Me />
                    </ProtectedRoute>
                  }
                  />
                <Route
                  path="myleaves"
                  element={
                  <ProtectedRoute>
                  <MyLeavesPage />
                  </ProtectedRoute>
                 }
/>
                
              </Route>
              <Route path="about" element={<About />} />
              <Route path="Auth" element={<AuthPage />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
