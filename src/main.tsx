import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
// import Stats from "./pages/Stats.jsx";
// import Admin from "./pages/Admin.jsx";
// import Profile from "./pages/Profile.jsx";
import "./index.css";
import { About } from "./pages/About.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="dashboard" element={<Home />} />
          {/* <Route path="stats" element={<Stats />} />
          <Route path="admin" element={<Admin />} />
          <Route path="profile" element={<Profile />} /> */}
        </Route>
        <Route path="about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
